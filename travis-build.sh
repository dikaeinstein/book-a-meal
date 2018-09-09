#!/bin/bash
if [[ -s //etc/profile ]]; then
  source //etc/profile
fi

if [[ -s $HOME/.bash_profile ]] ; then
  source $HOME/.bash_profile
fi

echo "source $HOME/.travis/job_stages" >> $HOME/.bashrc

mkdir -p $HOME/.travis

cat <<'EOFUNC' >>$HOME/.travis/job_stages
ANSI_RED="\033[31;1m"
ANSI_GREEN="\033[32;1m"
ANSI_YELLOW="\033[33;1m"
ANSI_RESET="\033[0m"
ANSI_CLEAR="\033[0K"

if [ $TERM = dumb ]; then
  unset TERM
fi
: "${SHELL:=/bin/bash}"
: "${TERM:=xterm}"
: "${USER:=travis}"
export SHELL
export TERM
export USER

case $(uname | tr '[A-Z]' '[a-z]') in
  linux)
    export TRAVIS_OS_NAME=linux
    ;;
  darwin)
    export TRAVIS_OS_NAME=osx
    ;;
  *)
    export TRAVIS_OS_NAME=notset
    ;;
esac

if [[ "$TRAVIS_OS_NAME" == linux ]]; then
  export TRAVIS_DIST="$(lsb_release -sc)"
  if command -v systemctl >/dev/null 2>&1; then
    export TRAVIS_INIT=systemd
  else
    export TRAVIS_INIT=upstart
  fi
fi

TRAVIS_TEST_RESULT=
TRAVIS_CMD=

TRAVIS_TMPDIR=$(mktemp -d 2>/dev/null || mktemp -d -t 'travis_tmp')
pgrep -u $USER | grep -v -w $$ > $TRAVIS_TMPDIR/pids_before

travis_cmd() {
  local assert output display retry timing cmd result secure

  cmd=$1
  TRAVIS_CMD=$cmd
  shift

  while true; do
    case "$1" in
      --assert)  assert=true; shift ;;
      --echo)    output=true; shift ;;
      --display) display=$2;  shift 2;;
      --retry)   retry=true;  shift ;;
      --timing)  timing=true; shift ;;
      --secure)  secure=" 2>/dev/null"; shift ;;
      *) break ;;
    esac
  done

  if [[ -n "$timing" ]]; then
    travis_time_start
  fi

  if [[ -n "$output" ]]; then
    echo "\$ ${display:-$cmd}"
  fi

  if [[ -n "$retry" ]]; then
    travis_retry eval "$cmd $secure"
    result=$?
  else
    if [[ -n "$secure" ]]; then
      eval "$cmd $secure" 2>/dev/null
    else
      eval "$cmd $secure"
    fi
    result=$?
    if [[ -n $secure && $result -ne 0 ]]; then
      echo -e "${ANSI_RED}The previous command failed, possibly due to a malformed secure environment variable.${ANSI_CLEAR}
${ANSI_RED}Please be sure to escape special characters such as ' ' and '$'.${ANSI_CLEAR}
${ANSI_RED}For more information, see https://docs.travis-ci.com/user/encryption-keys.${ANSI_CLEAR}"
    fi
  fi

  if [[ -n "$timing" ]]; then
    travis_time_finish
  fi

  if [[ -n "$assert" ]]; then
    travis_assert $result
  fi

  return $result
}

travis_time_start() {
  travis_timer_id=$(printf %08x $(( RANDOM * RANDOM )))
  travis_start_time=$(travis_nanoseconds)
  echo -en "travis_time:start:$travis_timer_id\r${ANSI_CLEAR}"
}

travis_time_finish() {
  local result=$?
  travis_end_time=$(travis_nanoseconds)
  local duration=$(($travis_end_time-$travis_start_time))
  echo -en "\ntravis_time:end:$travis_timer_id:start=$travis_start_time,finish=$travis_end_time,duration=$duration\r${ANSI_CLEAR}"
  return $result
}

travis_trace_span() {
  local result=$?
  local template="$1"
  local timestamp=$(travis_nanoseconds)
  template="${template/__TRAVIS_TIMESTAMP__/$timestamp}"
  template="${template/__TRAVIS_STATUS__/$result}"
  echo "$template" >> /tmp/build.trace
}

travis_nanoseconds() {
  local cmd="date"
  local format="+%s%N"
  local os=$(uname)

  if hash gdate > /dev/null 2>&1; then
    
    cmd="gdate"
  elif [[ "$os" = Darwin ]]; then
    
    format="+%s000000000"
  fi

  $cmd -u $format
}

travis_internal_ruby() {
  if ! type rvm &>/dev/null; then
    source $HOME/.rvm/scripts/rvm &>/dev/null
  fi
  local i selected_ruby rubies_array rubies_array_sorted rubies_array_len
  rubies_array=( $(
    rvm list strings \
      | while read -r v; do
          if [[ ! "${v}" =~ ^ruby-(2\.[0-2]\.[0-9]|1\.9\.3) ]]; then
            continue
          fi
          v="${v//ruby-/}"
          v="${v%%-*}"
          echo "$(vers2int "${v}")_${v}"
        done
  ) )
  bash_qsort_numeric "${rubies_array[@]}"
  rubies_array_sorted=( ${bash_qsort_numeric_ret[@]} )
  rubies_array_len="${#rubies_array_sorted[@]}"
  if (( rubies_array_len <= 0 )); then
    echo "default"
  else
    i=$(( rubies_array_len - 1 ))
    selected_ruby="${rubies_array_sorted[${i}]}"
    selected_ruby="${selected_ruby##*_}"
    echo "${selected_ruby:-default}"
  fi
}

travis_assert() {
  local result=${1:-$?}
  if [ $result -ne 0 ]; then
    echo -e "\n${ANSI_RED}The command \"$TRAVIS_CMD\" failed and exited with $result during $TRAVIS_STAGE.${ANSI_RESET}\n\nYour build has been stopped."
    travis_terminate 2
  fi
}

travis_result() {
  local result=$1
  export TRAVIS_TEST_RESULT=$(( ${TRAVIS_TEST_RESULT:-0} | $(($result != 0)) ))

  if [ $result -eq 0 ]; then
    echo -e "\n${ANSI_GREEN}The command \"$TRAVIS_CMD\" exited with $result.${ANSI_RESET}"
  else
    echo -e "\n${ANSI_RED}The command \"$TRAVIS_CMD\" exited with $result.${ANSI_RESET}"
  fi
}

travis_terminate() {
  set +e
  # Restoring the file descriptors of redirect_io filter strategy
  [[ "$TRAVIS_FILTERED" = redirect_io && -e /dev/fd/9 ]] \
      && sync \
      && command exec 1>&9 2>&9 9>&- \
      && sync
  pgrep -u $USER | grep -v -w $$ > $TRAVIS_TMPDIR/pids_after
  kill $(awk 'NR==FNR{a[$1]++;next};!($1 in a)' $TRAVIS_TMPDIR/pids_{before,after}) &> /dev/null || true
  pkill -9 -P $$ &> /dev/null || true
  exit $1
}

travis_wait() {
  local timeout=$1

  if [[ $timeout =~ ^[0-9]+$ ]]; then
    
    shift
  else
    
    timeout=20
  fi

  local cmd="$@"
  local log_file=travis_wait_$$.log

  $cmd &>$log_file &
  local cmd_pid=$!

  travis_jigger $! $timeout $cmd &
  local jigger_pid=$!
  local result

  {
    wait $cmd_pid 2>/dev/null
    result=$?
    ps -p$jigger_pid &>/dev/null && kill $jigger_pid
  }

  if [ $result -eq 0 ]; then
    echo -e "\n${ANSI_GREEN}The command $cmd exited with $result.${ANSI_RESET}"
  else
    echo -e "\n${ANSI_RED}The command $cmd exited with $result.${ANSI_RESET}"
  fi

  echo -e "\n${ANSI_GREEN}Log:${ANSI_RESET}\n"
  cat $log_file

  return $result
}

travis_jigger() {
  
  local cmd_pid=$1
  shift
  local timeout=$1 
  shift
  local count=0

  
  echo -e "\n"

  while [ $count -lt $timeout ]; do
    count=$(($count + 1))
    echo -ne "Still running ($count of $timeout): $@\r"
    sleep 60
  done

  echo -e "\n${ANSI_RED}Timeout (${timeout} minutes) reached. Terminating \"$@\"${ANSI_RESET}\n"
  kill -9 $cmd_pid
}

travis_retry() {
  local result=0
  local count=1
  while [ $count -le 3 ]; do
    [ $result -ne 0 ] && {
      echo -e "\n${ANSI_RED}The command \"$@\" failed. Retrying, $count of 3.${ANSI_RESET}\n" >&2
    }
    "$@" && { result=0 && break; } || result=$?
    count=$(($count + 1))
    sleep 1
  done

  [ $count -gt 3 ] && {
    echo -e "\n${ANSI_RED}The command \"$@\" failed 3 times.${ANSI_RESET}\n" >&2
  }

  return $result
}

travis_fold() {
  local action=$1
  local name=$2
  echo -en "travis_fold:${action}:${name}\r${ANSI_CLEAR}"
}

travis_download() {
  local src="${1}"
  local dst="${2}"

  if curl --version &>/dev/null; then
    curl -fsSL --connect-timeout 5 "${src}" -o "${dst}" 2>/dev/null
    return $?
  fi

  if wget --version &>/dev/null; then
    wget --connect-timeout 5 -q "${src}" -O "${dst}" 2>/dev/null
    return $?
  fi

  return 1
}

decrypt() {
  echo $1 | base64 -d | openssl rsautl -decrypt -inkey $HOME/.ssh/id_rsa.repo
}

vers2int() {
  printf '1%03d%03d%03d%03d' $(echo "$1" | tr '.' ' ')
}

bash_qsort_numeric() {
   local pivot i smaller=() larger=()
   bash_qsort_numeric_ret=()
   (($#==0)) && return 0
   pivot=${1}
   shift
   for i; do
      if [[ ${i%%_*} -lt ${pivot%%_*} ]]; then
         smaller+=( "$i" )
      else
         larger+=( "$i" )
      fi
   done
   bash_qsort_numeric "${smaller[@]}"
   smaller=( "${bash_qsort_numeric_ret[@]}" )
   bash_qsort_numeric "${larger[@]}"
   larger=( "${bash_qsort_numeric_ret[@]}" )
   bash_qsort_numeric_ret=( "${smaller[@]}" "$pivot" "${larger[@]}" )
}

EOFUNC


if [[ -f /etc/apt/sources.list.d/rabbitmq-source.list ]] ; then
  sudo rm -f /etc/apt/sources.list.d/rabbitmq-source.list
fi


if [[ -f /etc/apt/sources.list.d/neo4j.list ]] ; then
  sudo rm -f /etc/apt/sources.list.d/neo4j.list
fi

mkdir -p $HOME/build
cd       $HOME/build

# START_FUNCS
cat <<'EOFUNC_SETUP_FILTER' >>$HOME/.travis/job_stages
function travis_run_setup_filter() {
for dir in $(echo $PATH | tr : " "); do
  test -d $dir && sudo chmod o-w $dir | grep changed
done

:
}

EOFUNC_SETUP_FILTER
cat <<'EOFUNC_CONFIGURE' >>$HOME/.travis/job_stages
function travis_run_configure() {

travis_fold start system_info
  echo -e "\033[33;1mBuild system information\033[0m"
  echo -e "Build language: node_js"
  echo -e "Build dist: trusty"
  echo -e "Build id: ''"
  echo -e "Job id: ''"
  echo -e "Runtime kernel version: $(uname -r)"
  if [[ -f /usr/share/travis/system_info ]]; then
    cat /usr/share/travis/system_info
  fi
  if [[ -f /usr/local/travis/system_info ]]; then
    cat /usr/local/travis/system_info
  fi
travis_fold end system_info

echo
          if [[ -d /var/lib/apt/lists && -n $(command -v apt-get) ]]; then
            grep -l -i -r basho /etc/apt/sources.list.d | xargs sudo rm -f
          fi

          if [[ -d /var/lib/apt/lists && -n $(command -v apt-get) ]]; then
            for f in $(grep -l rwky/redis /etc/apt/sources.list.d/*); do
              sed 's,rwky/redis,rwky/ppa,g' $f > /tmp/${f##**/}
              sudo mv /tmp/${f##**/} /etc/apt/sources.list.d
            done
          fi

travis_wait_for_network() {
  local wait_retries="${1}"
  local count=0
  shift
  local urls=("${@}")

  while [[ "${count}" -lt "${wait_retries}" ]]; do
    local confirmed=0
    for url in "${urls[@]}"; do
      if travis_download "${url}" /dev/null; then
        confirmed=$((confirmed + 1))
      fi
    done

    if [[ "${#urls[@]}" -eq "${confirmed}" ]]; then
      echo -e "${ANSI_GREEN}Network availability confirmed.${ANSI_RESET}"
      return
    fi

    count=$((count + 1))
    sleep 1
  done

  echo -e "${ANSI_RED}Timeout waiting for network availability.${ANSI_RESET}"
}

travis_wait_for_network '20' 'http:///empty.txt?job_id=&repo=Dikaeinstein/book-a-meal'
echo

if [[ "$TRAVIS_OS_NAME" == linux ]]; then
  apt-key adv --list-public-keys --with-fingerprint --with-colons |
    awk -F: '
        $1=="pub" && $2~/^[er]$/ { state="expired" }
        $1=="fpr" && state == "expired" {
          out = sprintf("%s %s", out, $(NF -1))
          state="valid"
        }
        END {
          if (length(out)>0)
            printf "sudo apt-key adv --recv-keys --keyserver ha.pool.sks-keyservers.net %s", out
        }
      ' |
    bash &>/dev/null
fi

            if command -v lsb_release; then
              grep -l -i -r hhvm /etc/apt/sources.list.d | xargs sudo rm -f
              sudo sed -i /hhvm/d /etc/apt/sources.list
              if [[ $(lsb_release -cs) = trusty ]]; then
                sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xB4112585D386EB94
                sudo add-apt-repository "deb [arch=amd64] https://dl.hhvm.com/ubuntu $(lsb_release -sc) main"
              fi
            fi &>/dev/null

            if command -v lsb_release &>/dev/null; then
              shopt -s nullglob
              for f in /etc/apt/sources.list.d/mongodb-*.list; do
                grep -vq arch=amd64 "$f" && sudo sed -i 's/^deb /deb [arch=amd64] /' "$f"
              done
              shopt -u nullglob
            fi

if [[ $(uname) = Linux ]]; then
  if [[ $(lsb_release -sc 2>/dev/null) = trusty ]]; then
    unset _JAVA_OPTIONS
    unset MALLOC_ARENA_MAX
  fi
fi

export PATH=$(echo $PATH | sed -e 's/::/:/g')
export PATH=$(echo -n $PATH | perl -e 'print join(":", grep { not $seen{$_}++ } split(/:/, scalar <>))')
echo "options rotate
options timeout:1

nameserver 8.8.8.8
nameserver 8.8.4.4
nameserver 208.67.222.222
nameserver 208.67.220.220
" | sudo tee /etc/resolv.conf &> /dev/null
sudo sed -e 's/^\(127\.0\.0\.1.*\)$/\1 '`hostname`'/' -i'.bak' /etc/hosts
test -f ~/.m2/settings.xml && sed -i.bak -e 's|https://nexus.codehaus.org/snapshots/|https://oss.sonatype.org/content/repositories/codehaus-snapshots/|g' ~/.m2/settings.xml
sed -e 's/^\([0-9a-f:]\+\s\)localhost/\1/' /etc/hosts > /tmp/hosts.tmp && cat /tmp/hosts.tmp | sudo tee /etc/hosts > /dev/null 2>&1
test -f /etc/mavenrc && sudo sed -e 's/M2_HOME=\(.\+\)$/M2_HOME=${M2_HOME:-\1}/' -i'.bak' /etc/mavenrc
if [ $(command -v sw_vers) ]; then
  echo "Fix WWDRCA Certificate"
  sudo security delete-certificate -Z 0950B6CD3D2F37EA246A1AAA20DFAADBD6FE1F75 /Library/Keychains/System.keychain
  wget -q https://developer.apple.com/certificationauthority/AppleWWDRCA.cer
  sudo security add-certificates -k /Library/Keychains/System.keychain AppleWWDRCA.cer
fi

grep '^127\.0\.0\.1' /etc/hosts | sed -e 's/^127\.0\.0\.1\s\{1,\}\(.*\)/\1/g' | sed -e 's/localhost \(.*\)/\1/g' | tr "\n" " " > /tmp/hosts_127_0_0_1
sed '/^127\.0\.0\.1/d' /etc/hosts > /tmp/hosts_sans_127_0_0_1
cat /tmp/hosts_sans_127_0_0_1 | sudo tee /etc/hosts > /dev/null
echo -n "127.0.0.1 localhost " | sudo tee -a /etc/hosts > /dev/null
cat /tmp/hosts_127_0_0_1 | sudo tee -a /etc/hosts > /dev/null
# apply :home_paths
for path_entry in $HOME/.local/bin $HOME/bin ; do
  if [[ ${PATH%%:*} != $path_entry ]] ; then
    export PATH="$path_entry:$PATH"
  fi
done

if [ ! $(uname|grep Darwin) ]; then echo update_initramfs=no | sudo tee -a /etc/initramfs-tools/update-initramfs.conf > /dev/null; fi

if [[ "$(sw_vers -productVersion 2>/dev/null | cut -d . -f 2)" -lt 12 ]]; then
  mkdir -p $HOME/.ssh
  chmod 0700 $HOME/.ssh
  touch $HOME/.ssh/config
  echo -e "Host *
    UseRoaming no
  " | cat - $HOME/.ssh/config > $HOME/.ssh/config.tmp && mv $HOME/.ssh/config.tmp $HOME/.ssh/config
fi

function travis_debug() {
echo -e "\033[31;1mThe debug environment is not available. Please contact support.\033[0m"
false
}

if [[ $(command -v sw_vers) ]]; then
  travis_cmd rvm\ use --echo
fi

if [[ -L /usr/lib/jvm/java-8-oracle-amd64 ]]; then
  echo -e "Removing symlink /usr/lib/jvm/java-8-oracle-amd64"
  travis_cmd sudo\ rm\ -f\ /usr/lib/jvm/java-8-oracle-amd64 --echo
  if [[ -f $HOME/.jdk_switcher_rc ]]; then
    echo -e "Reload jdk_switcher"
    travis_cmd source\ \$HOME/.jdk_switcher_rc --echo
  fi
  if [[ -f /opt/jdk_switcher/jdk_switcher.sh ]]; then
    echo -e "Reload jdk_switcher"
    travis_cmd source\ /opt/jdk_switcher/jdk_switcher.sh --echo
  fi
fi

if [[ $(uname -m) != ppc64le && $(command -v lsb_release) && $(lsb_release -cs) != precise ]]; then
  travis_cmd sudo\ dpkg\ --add-architecture\ i386
fi

cat >$HOME/.rvm/hooks/after_use <<EORVMHOOK
gem --help >&/dev/null || return 0

vers2int() {
  printf '1%03d%03d%03d%03d' \$(echo "\$1" | tr '.' ' ')
}

if [[ \$(vers2int \`gem --version\`) -lt \$(vers2int "2.6.13") ]]; then
  echo ""
  echo -e "\033[32;1m** Updating RubyGems to the latest version for security reasons. **\033[0m"
  echo -e "\033[32;1m** If you need an older version, you can downgrade with 'gem update --system OLD_VERSION'. **\033[0m"
  echo ""
  gem update --system >&/dev/null
fi
EORVMHOOK

chmod +x $HOME/.rvm/hooks/after_use
[[ -n "$(yarn global bin 2>/dev/null | grep /)" && ! :$PATH: =~ :$(yarn global bin 2>/dev/null | grep /): ]] && export PATH="$PATH:$(yarn global bin 2>/dev/null | grep /)"

function curl() {
  command curl --retry 2 -sS "$@"
}

if [[ $TRAVIS_FILTERED = redirect_io ]]; then
  cat <<\EOPY >~/nonblock.py
import os
import sys
import fcntl

flags_stdout = fcntl.fcntl(sys.stdout, fcntl.F_GETFL)
fcntl.fcntl(sys.stdout, fcntl.F_SETFL, flags_stdout&~os.O_NONBLOCK)

flags_stderr = fcntl.fcntl(sys.stderr, fcntl.F_GETFL)
fcntl.fcntl(sys.stderr, fcntl.F_SETFL, flags_stderr&~os.O_NONBLOCK)
EOPY
  python ~/nonblock.py
  rm ~/nonblock.py
fi

:
}

EOFUNC_CONFIGURE
cat <<'EOFUNC_PREPARE' >>$HOME/.travis/job_stages
function travis_run_prepare() {

if [[ "$TRAVIS_OS_NAME" != "linux" ]]; then
  echo -e "\033[31;1mServices are not supported on "$TRAVIS_OS_NAME"\033[0m"
else
  travis_fold start services
    travis_setup_postgresql() {
      local port start_cmd stop_cmd version
    
      version=""
    
      if [[ -z "$version" ]]; then
        case "$TRAVIS_DIST" in
          precise)
            version="9.1"
            ;;
          trusty)
            version="9.2"
            ;;
          xenial)
            version="9.6"
            ;;
          *)
            echo -e ${ANSI_RED}Unrecognized operating system.${ANSI_CLEAR}
            ;;
        esac
      fi
    
      echo -e "${ANSI_YELLOW}Starting PostgreSQL v${version}${ANSI_CLEAR}"
      export PATH="/usr/lib/postgresql/${version}/bin:$PATH"
    
      if [[ "$TRAVIS_INIT" == upstart ]]; then
        start_cmd="sudo service postgresql start $version"
        stop_cmd="sudo service postgresql stop"
      elif [[ "$TRAVIS_INIT" == systemd ]]; then
        start_cmd="sudo systemctl start postgresql@${version}-main"
        stop_cmd="sudo systemctl stop postgresql"
      fi
    
      $stop_cmd
    
      sudo bash -c "
    	if [[ -d /var/ramfs && ! -d \"/var/ramfs/postgresql/$version\" ]]; then
          mkdir -p /var/ramfs/postgresql
    	  cp -rp \"/var/lib/postgresql/$version\" \"/var/ramfs/postgresql/$version\"
    	fi
      " &>/dev/null
    
      $start_cmd
      echo $start_cmd
    
      pushd / &>/dev/null
      for port in 5432 5433; do
        sudo -u postgres createuser -s -p "$port" travis
        sudo -u postgres createdb -O travis -p "$port" travis
      done &>/dev/null
      popd &>/dev/null
    
      unset -f travis_setup_postgresql
    }
    travis_cmd travis_setup_postgresql --echo --timing
    sleep 3
  travis_fold end services
fi

export PS4=+
:
}

EOFUNC_PREPARE
cat <<'EOFUNC_DISABLE_SUDO' >>$HOME/.travis/job_stages
function travis_run_disable_sudo() {
:
}

EOFUNC_DISABLE_SUDO
cat <<'EOFUNC_CHECKOUT' >>$HOME/.travis/job_stages
function travis_run_checkout() {
export GIT_ASKPASS=echo
echo

travis_fold start git.checkout
  if [[ ! -d Dikaeinstein/book-a-meal/.git ]]; then
    travis_cmd git\ clone\ --depth\=50\ --branch\=\'\'\ https://github.com/Dikaeinstein/book-a-meal.git\ Dikaeinstein/book-a-meal --echo --retry --timing
    if [[ $? -ne 0 ]]; then
      echo -e "\033[31;1mFailed to clone from GitHub.\033[0m"
      echo -e "Checking GitHub status (https://status.github.com/api/last-message.json):"
      curl -sL https://status.github.com/api/last-message.json | jq -r .[]
      travis_terminate 1
    fi
  else
    travis_cmd git\ -C\ Dikaeinstein/book-a-meal\ fetch\ origin --assert --echo --retry --timing
    travis_cmd git\ -C\ Dikaeinstein/book-a-meal\ reset\ --hard --assert --echo
  fi
  travis_cmd cd\ Dikaeinstein/book-a-meal --echo
  travis_cmd git\ checkout\ -qf\  --assert --echo
travis_fold end git.checkout

if [[ -f .gitmodules ]]; then
  travis_fold start git.submodule
    echo Host\ github.com'
    '\	StrictHostKeyChecking\ no'
    ' >> ~/.ssh/config
    travis_cmd git\ submodule\ update\ --init\ --recursive --assert --echo --retry --timing
  travis_fold end git.submodule
fi

:
}

EOFUNC_CHECKOUT
cat <<'EOFUNC_EXPORT' >>$HOME/.travis/job_stages
function travis_run_export() {
export TRAVIS=true
export CI=true
export CONTINUOUS_INTEGRATION=true
export PAGER=cat
export HAS_JOSH_K_SEAL_OF_APPROVAL=true
export TRAVIS_ALLOW_FAILURE=''
export TRAVIS_EVENT_TYPE=''
export TRAVIS_PULL_REQUEST=false
export TRAVIS_SECURE_ENV_VARS=false
export TRAVIS_BUILD_ID=''
export TRAVIS_BUILD_NUMBER=''
export TRAVIS_BUILD_DIR=$HOME/build/Dikaeinstein/book-a-meal
export TRAVIS_JOB_ID=''
export TRAVIS_JOB_NUMBER=''
export TRAVIS_BRANCH=''
export TRAVIS_COMMIT=''
export TRAVIS_COMMIT_MESSAGE=$(git log --format=%B -n 1 | head -c 32768)
export TRAVIS_COMMIT_RANGE=''
export TRAVIS_REPO_SLUG=Dikaeinstein/book-a-meal
export TRAVIS_OSX_IMAGE=''
export TRAVIS_LANGUAGE=node_js
export TRAVIS_TAG=''
export TRAVIS_SUDO=true
export TRAVIS_BUILD_STAGE_NAME=''
export TRAVIS_PULL_REQUEST_BRANCH=''
export TRAVIS_PULL_REQUEST_SHA=''
export TRAVIS_PULL_REQUEST_SLUG=''
export TRAVIS_NODE_VERSION=8.11.3
:
}

EOFUNC_EXPORT
cat <<'EOFUNC_SETUP' >>$HOME/.travis/job_stages
function travis_run_setup() {

if [[ $(echo :$PATH: | grep -v :./node_modules/.bin:) ]]; then
  travis_cmd export\ PATH\=./node_modules/.bin:\$PATH --echo
fi

travis_fold start nvm.install
  travis_cmd nvm\ install\ 8.11.3 --echo --timing
  if [[ $? -ne 0 ]]; then
    echo -e "\033[31;1mFailed to install 8.11.3. Remote repository may not be reachable.\033[0m"
    echo -e "Using locally available version 8.11.3, if applicable."
    travis_cmd nvm\ use\ 8.11.3 --echo
    if [[ $? -ne 0 ]]; then
      echo -e "\033[31;1mUnable to use 8.11.3\033[0m"
      travis_cmd false --assert
    fi
  fi
  export TRAVIS_NODE_VERSION=8.11.3
travis_fold end nvm.install

if [[ $(command -v sw_vers) && -f $HOME/.npmrc ]]; then
  travis_cmd npm\ config\ delete\ prefix --assert --echo --timing
fi

travis_cmd npm\ config\ set\ spin\ false --assert
travis_cmd npm\ config\ set\ progress\ false --assert

if [[ -f yarn.lock ]]; then
  if [[ $(vers2int $(echo `node --version` | tr -d 'v')) -lt $(vers2int 4) ]]; then
    echo -e "\033[31;1mNode.js version $(node --version) does not meet requirement for yarn. Please use Node.js 4 or later.\033[0m"
    travis_fold start install.npm
      if [[ $(vers2int `npm -v`) -ge $(vers2int 5.8.0) && (-f npm-shrinkwrap.json || -f package-lock.json) ]]; then
        travis_cmd npm\ ci\  --assert --echo --retry --timing
      else
        travis_cmd npm\ install\  --assert --echo --retry --timing
      fi
      if [[ $(vers2int `npm -v`) -gt $(vers2int 5) ]]; then
        travis_cmd npm\ ls --echo --timing
      fi
    travis_fold end install.npm
  else
    travis_fold start install.yarn
      if [[ -z "$(command -v yarn)" ]]; then
        if [[ -z "$(command -v gpg)" ]]; then
          travis_cmd export\ YARN_GPG\=no --echo
        fi
        echo -e "\033[32;1mInstalling yarn\033[0m"
        travis_cmd curl\ -o-\ -L\ https://yarnpkg.com/install.sh\ \|\ bash --assert --echo --timing
        echo -e "\033[32;1mSetting up \$PATH\033[0m"
        travis_cmd export\ PATH\=\$HOME/.yarn/bin:\$PATH --echo
      fi
    travis_fold end install.yarn
  fi
fi

:
}

EOFUNC_SETUP
cat <<'EOFUNC_SETUP_CASHER' >>$HOME/.travis/job_stages
function travis_run_setup_casher() {

travis_fold start cache.1
  echo -e "Setting up build cache"
  rvm use $(rvm current 2>/dev/null) >&/dev/null
  travis_cmd export\ CASHER_DIR\=\$HOME/.casher --echo
  mkdir -p $CASHER_DIR/bin
  travis_cmd curl\ -sf\ \ -o\ \$CASHER_DIR/bin/casher\ https:///files/casher --echo --display Installing\ caching\ utilities --retry --timing
  if [[ $? -ne 0 ]]; then
    travis_cmd curl\ -sf\ \ -o\ \$CASHER_DIR/bin/casher\ https://raw.githubusercontent.com/travis-ci/casher/production/bin/casher --echo --display Installing\ caching\ utilities\ from\ the\ Travis\ CI\ server\ \(https:///files/casher\)\ failed,\ failing\ over\ to\ using\ GitHub\ \(https://raw.githubusercontent.com/travis-ci/casher/production/bin/casher\) --retry --timing
  fi
  if [[ $? -ne 0 ]]; then
    echo -e "\033[33;1mFailed to fetch casher from GitHub, disabling cache.\033[0m"
  fi
  if [[ -f $CASHER_DIR/bin/casher ]]; then
    chmod +x $CASHER_DIR/bin/casher
  fi
  if [[ $- = *e* ]]; then
    ERREXIT_SET=true
  fi
  set +e
  if [[ -f $CASHER_DIR/bin/casher ]]; then
    travis_cmd type\ rvm\ \&\>/dev/null\ \|\|\ source\ \~/.rvm/scripts/rvm --timing
    travis_cmd rvm\ \$\(travis_internal_ruby\)\ --fuzzy\ do\ \$CASHER_DIR/bin/casher\ fetch\ https://s3.amazonaws.com/cache_bucket/1234567890//cache-trusty-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855--node-8.11.3.tgz\\\?X-Amz-Algorithm\\\=AWS4-HMAC-SHA256\\\&X-Amz-Credential\\\=abcdef0123456789\\\%2F20180907\\\%2Fus-east-1\\\%2Fs3\\\%2Faws4_request\\\&X-Amz-Date\\\=20180907T191059Z\\\&X-Amz-Expires\\\=60\\\&X-Amz-Signature\\\=23335fc4fb45d0ed688cb08cddf8bd590ea8c332b3ffd339eb81032ee1da3f4d\\\&X-Amz-SignedHeaders\\\=host\ https://s3.amazonaws.com/cache_bucket/1234567890//cache--node-8.11.3.tgz\\\?X-Amz-Algorithm\\\=AWS4-HMAC-SHA256\\\&X-Amz-Credential\\\=abcdef0123456789\\\%2F20180907\\\%2Fus-east-1\\\%2Fs3\\\%2Faws4_request\\\&X-Amz-Date\\\=20180907T191059Z\\\&X-Amz-Expires\\\=60\\\&X-Amz-Signature\\\=877fb5ec43bdc964b5c0fddf25d94082bae5ae0bdb114d61e099d66b4ae1e0a9\\\&X-Amz-SignedHeaders\\\=host\ https://s3.amazonaws.com/cache_bucket/1234567890/cache-trusty-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855--node-8.11.3.tgz\\\?X-Amz-Algorithm\\\=AWS4-HMAC-SHA256\\\&X-Amz-Credential\\\=abcdef0123456789\\\%2F20180907\\\%2Fus-east-1\\\%2Fs3\\\%2Faws4_request\\\&X-Amz-Date\\\=20180907T191059Z\\\&X-Amz-Expires\\\=60\\\&X-Amz-Signature\\\=fdec3c503a0ad642294a941e71bb470f05e8312b2c9b1684ba70bcbaf80106a1\\\&X-Amz-SignedHeaders\\\=host\ https://s3.amazonaws.com/cache_bucket/1234567890/cache--node-8.11.3.tgz\\\?X-Amz-Algorithm\\\=AWS4-HMAC-SHA256\\\&X-Amz-Credential\\\=abcdef0123456789\\\%2F20180907\\\%2Fus-east-1\\\%2Fs3\\\%2Faws4_request\\\&X-Amz-Date\\\=20180907T191059Z\\\&X-Amz-Expires\\\=60\\\&X-Amz-Signature\\\=409e395c9f24957895d49059db0da4e8c39f273be779df673bfb61ad0280bcd2\\\&X-Amz-SignedHeaders\\\=host --timing
  fi
  if [[ -n $ERREXIT_SET ]]; then
    set -e
  fi
  if [[ $- = *e* ]]; then
    ERREXIT_SET=true
  fi
  set +e
  if [[ -f $CASHER_DIR/bin/casher ]]; then
    travis_cmd type\ rvm\ \&\>/dev/null\ \|\|\ source\ \~/.rvm/scripts/rvm --timing
    travis_cmd rvm\ \$\(travis_internal_ruby\)\ --fuzzy\ do\ \$CASHER_DIR/bin/casher\ add\ node_modules --timing
  fi
  if [[ -n $ERREXIT_SET ]]; then
    set -e
  fi
travis_fold end cache.1

:
}

EOFUNC_SETUP_CASHER
cat <<'EOFUNC_SETUP_CACHE' >>$HOME/.travis/job_stages
function travis_run_setup_cache() {
:
}

EOFUNC_SETUP_CACHE
cat <<'EOFUNC_ANNOUNCE' >>$HOME/.travis/job_stages
function travis_run_announce() {
travis_cmd node\ --version --echo
travis_cmd npm\ --version --echo
travis_cmd nvm\ --version --echo

if [[ -f yarn.lock ]]; then
  travis_cmd yarn\ --version --echo
  hash -d yarn
fi

:
}

EOFUNC_ANNOUNCE
cat <<'EOFUNC_DEBUG' >>$HOME/.travis/job_stages
function travis_run_debug() {
:
}

EOFUNC_DEBUG
cat <<'EOFUNC_BEFORE_INSTALL' >>$HOME/.travis/job_stages
function travis_run_before_install() {

travis_fold start before_install.1
  travis_cmd curl\ -o-\ -L\ https://yarnpkg.com/install.sh\ \|\ bash\ -s\ --\ --version\ 1.9.4 --assert --echo --timing
travis_fold end before_install.1

travis_fold start before_install.2
  travis_cmd export\ PATH\=\"\$HOME/.yarn/bin:\$PATH\" --assert --echo --timing
travis_fold end before_install.2

:
}

EOFUNC_BEFORE_INSTALL
cat <<'EOFUNC_INSTALL' >>$HOME/.travis/job_stages
function travis_run_install() {

if [[ -f package.json ]]; then
  if [[ -f yarn.lock ]]; then
    if [[ $(vers2int $(echo `node --version` | tr -d 'v')) -lt $(vers2int 4) ]]; then
      travis_fold start install.npm
        if [[ $(vers2int `npm -v`) -ge $(vers2int 5.8.0) && (-f npm-shrinkwrap.json || -f package-lock.json) ]]; then
          travis_cmd npm\ ci\  --assert --echo --retry --timing
        else
          travis_cmd npm\ install\  --assert --echo --retry --timing
        fi
        if [[ $(vers2int `npm -v`) -gt $(vers2int 5) ]]; then
          travis_cmd npm\ ls --echo --timing
        fi
      travis_fold end install.npm
    else
      travis_fold start install
        travis_cmd yarn --assert --echo --retry --timing
      travis_fold end install
    fi
  else
    travis_fold start install.npm
      if [[ $(vers2int `npm -v`) -ge $(vers2int 5.8.0) && (-f npm-shrinkwrap.json || -f package-lock.json) ]]; then
        travis_cmd npm\ ci\  --assert --echo --retry --timing
      else
        travis_cmd npm\ install\  --assert --echo --retry --timing
      fi
      if [[ $(vers2int `npm -v`) -gt $(vers2int 5) ]]; then
        travis_cmd npm\ ls --echo --timing
      fi
    travis_fold end install.npm
  fi
fi

:
}

EOFUNC_INSTALL
cat <<'EOFUNC_BEFORE_SCRIPT' >>$HOME/.travis/job_stages
function travis_run_before_script() {

travis_fold start before_script.1
  travis_cmd yarn\ install --assert --echo --timing
travis_fold end before_script.1

travis_fold start before_script.2
  travis_cmd psql\ -c\ \'create\ database\ book_a_meal_ci_test\;\'\ -U\ postgres --assert --echo --timing
travis_fold end before_script.2

:
}

EOFUNC_BEFORE_SCRIPT
cat <<'EOFUNC_SCRIPT' >>$HOME/.travis/job_stages
function travis_run_script() {
travis_cmd yarn\ test --echo --timing
travis_result $?
:
}

EOFUNC_SCRIPT
cat <<'EOFUNC_BEFORE_CACHE' >>$HOME/.travis/job_stages
function travis_run_before_cache() {
:
}

EOFUNC_BEFORE_CACHE
cat <<'EOFUNC_CACHE' >>$HOME/.travis/job_stages
function travis_run_cache() {

travis_fold start cache.2
  echo -e "store build cache"
  if [[ $- = *e* ]]; then
    ERREXIT_SET=true
  fi
  set +e
  if [[ -n $ERREXIT_SET ]]; then
    set -e
  fi
  if [[ $- = *e* ]]; then
    ERREXIT_SET=true
  fi
  set +e
  if [[ -f $CASHER_DIR/bin/casher ]]; then
    travis_cmd type\ rvm\ \&\>/dev/null\ \|\|\ source\ \~/.rvm/scripts/rvm --timing
    travis_cmd rvm\ \$\(travis_internal_ruby\)\ --fuzzy\ do\ \$CASHER_DIR/bin/casher\ push\ https://s3.amazonaws.com/cache_bucket/1234567890//cache-trusty-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855--node-8.11.3.tgz\\\?X-Amz-Algorithm\\\=AWS4-HMAC-SHA256\\\&X-Amz-Credential\\\=abcdef0123456789\\\%2F20180907\\\%2Fus-east-1\\\%2Fs3\\\%2Faws4_request\\\&X-Amz-Date\\\=20180907T191059Z\\\&X-Amz-Expires\\\=60\\\&X-Amz-Signature\\\=d82c79b36b3d6acbdeae307fb67183b6df90a95f74f4cf89265935787e8076e6\\\&X-Amz-SignedHeaders\\\=host --timing
  fi
  if [[ -n $ERREXIT_SET ]]; then
    set -e
  fi
travis_fold end cache.2

:
}

EOFUNC_CACHE
cat <<'EOFUNC_RESET_STATE' >>$HOME/.travis/job_stages
function travis_run_reset_state() {
:
}

EOFUNC_RESET_STATE
cat <<'EOFUNC_AFTER_SUCCESS' >>$HOME/.travis/job_stages
function travis_run_after_success() {

if [[ $TRAVIS_TEST_RESULT = 0 ]]; then
  travis_fold start after_success
    travis_cmd yarn\ coverage --echo --timing
  travis_fold end after_success
  if [[ ($TRAVIS_REPO_SLUG = "Dikaeinstein/book-a-meal") && ($TRAVIS_BRANCH = develop) ]]; then
    if [[ $- = *e* ]]; then
      ERREXIT_SET=true
    fi
    set +e
    travis_fold start dpl_0
      if [[ $(rvm use $(travis_internal_ruby) do ruby -e "puts RUBY_VERSION") = 1.9* ]]; then
        type rvm &>/dev/null || source ~/.rvm/scripts/rvm
        travis_cmd rvm\ \$\(travis_internal_ruby\)\ --fuzzy\ do\ ruby\ -S\ gem\ install\ dpl\ -v\ \'\<\ 1.9\'\  --assert --echo --timing
      else
        type rvm &>/dev/null || source ~/.rvm/scripts/rvm
        travis_cmd rvm\ \$\(travis_internal_ruby\)\ --fuzzy\ do\ ruby\ -S\ gem\ install\ dpl --assert --echo --timing
      fi
      rm -f $TRAVIS_BUILD_DIR/dpl-*.gem
    travis_fold end dpl_0
    type rvm &>/dev/null || source ~/.rvm/scripts/rvm
    travis_cmd rvm\ \$\(travis_internal_ruby\)\ --fuzzy\ do\ ruby\ -S\ dpl\ --provider\=\"heroku\"\ --app\=\"dikaeinstein-book-a-meal\"\ --fold\;\ if\ \[\ \$\?\ -ne\ 0\ \]\;\ then\ echo\ \"failed\ to\ deploy\"\;\ travis_terminate\ 2\;\ fi --timing
    if [[ -n $ERREXIT_SET ]]; then
      set -e
    fi
  else
    if [[  ! ($TRAVIS_REPO_SLUG = "Dikaeinstein/book-a-meal") ]]; then
      echo -e "\033[33;1mSkipping a deployment with the heroku provider because this repo's name does not match one specified in .travis.yml's deploy.on.repo: Dikaeinstein/book-a-meal\033[0m"
    fi
    if [[  ! ($TRAVIS_BRANCH = develop) ]]; then
      echo -e "\033[33;1mSkipping a deployment with the heroku provider because this branch is not permitted: \033[0m"
    fi
  fi
fi

}

EOFUNC_AFTER_SUCCESS
cat <<'EOFUNC_AFTER_FAILURE' >>$HOME/.travis/job_stages
function travis_run_after_failure() {
:
}

EOFUNC_AFTER_FAILURE
cat <<'EOFUNC_AFTER_SCRIPT' >>$HOME/.travis/job_stages
function travis_run_after_script() {
:
}

EOFUNC_AFTER_SCRIPT
cat <<'EOFUNC_FINISH' >>$HOME/.travis/job_stages
function travis_run_finish() {
:
}

EOFUNC_FINISH
# END_FUNCS
source $HOME/.travis/job_stages
travis_run_setup_filter
travis_run_configure
travis_run_prepare
travis_run_disable_sudo
travis_run_checkout
travis_run_export
travis_run_setup
travis_run_setup_casher
travis_run_setup_cache
travis_run_announce
travis_run_debug
travis_run_before_install
travis_run_install
travis_run_before_script
travis_run_script
travis_run_before_cache
travis_run_cache
travis_run_after_success
travis_run_after_failure
travis_run_after_script
travis_run_finish
echo -e "\nDone. Your build exited with $TRAVIS_TEST_RESULT."

travis_terminate $TRAVIS_TEST_RESULT
