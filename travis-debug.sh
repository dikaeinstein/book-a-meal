#!/usr/bin/env zsh

# Start a Docker container detached with /sbin/init
docker run -v /Users/Dikaeinstein/projects/js_projects:/data --name travis-debug -dit travisci/ci-garnet:packer-1512502276-986baf0 /sbin/init
# Open a login shell in the running container
docker exec -it travis-debug bash -l
# Set user to travis
su - travis
# Change directory
# cd builds
# Clone travis-build git repo
# Travis Build exposes an API that Travis Workers and Job Board use to
# generate a bash script which is then copied to the job execution
# environment and executed, with the resulting output streamed back to Travis.
# git clone https://github.com/travis-ci/travis-build.git
# cd travis-build
# # Install travis
# gem install travis
# # Create symlink
# ln -s PATH_TO_TRAVIS_BUILD ~/.travis/travis-build
# # Install ruby bundler
# gem install bundler
# # Install travis-build dependencies in Gemfile
# bundle install --gemfile ~/.travis/travis-build/Gemfile
# # Create executable travis in /bin directory
# bundler binstubs travis

# Clone your git repo (Replace $branch and $repo_link with your branch and repo_link)
git clone --depth=50 --branch=$branch ${repo_link}
# (Optional) Check out the commit you want to test
git checkout 6b14763

# Manually install dependencies, if any.
# Manually run your Travis CI build command.