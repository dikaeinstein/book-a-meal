module.exports = {
  'User(caterer) can sign up': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .click('#root > div > header > nav > ul > li:nth-child(2) > a')
      .waitForElementVisible('#signIn > form', 3000)
      .click('#signIn > form > button')
      .click('#signIn > form')
      .assert
      .containsText('#signIn > form > div:nth-child(3) > div', 'Full Name is required')
      .setValue('#name', 'Ann Okwa')
      .setValue('#email', 'ann.okwa@gmail.com')
      .setValue('#password', 'password')
      .setValue('#confirmPassword', 'password')
      .setValue('#role', 'caterer')
      .click('#signIn > form > button')
      .waitForElementVisible('main.dash-main > h4:nth-child(1)', 5000)
      .assert.urlEquals('http://localhost:8000/dashboard')
      .assert.containsText('main.dash-main > h4:nth-child(1)', 'Dashboard')
      .end();
  },
  'User(caterer) can sign in': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .click('#root > div > header > nav > ul > li:nth-child(1) > a')
      .waitForElementVisible('#signIn > form', 3000)
      .click('#signIn > form > button')
      .click('#signIn > form')
      .assert
      .containsText('#signIn > form > div:nth-child(3) > div', 'Email is required')
      .setValue('#email', 'ann.okwa@gmail.com')
      .setValue('#password', 'password')
      .click('#signIn > form > button')
      .assert.urlEquals('http://localhost:8000/dashboard')
      .assert.containsText('main.dash-main > h4:nth-child(1)', 'Dashboard')
      .end();
  },
  'User(customer) can sign up': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .click('#root > div > header > nav > ul > li:nth-child(2) > a')
      .waitForElementVisible('#signIn > form', 3000)
      .setValue('#name', 'Chinonso Okorie')
      .setValue('#email', 'chizzy.korie@gmail.com')
      .setValue('#password', 'password')
      .setValue('#confirmPassword', 'password')
      .click('#signIn > form > button')
      .assert.urlEquals('http://localhost:8000/user-menu')
      .click('.nav-container > li:nth-child(4)')
      .click('.swal-button--confirm');
  },
  'User(customer) can sign in': (client) => {
    client
      .waitForElementVisible('body', 3000)
      .click('#root > div > header > nav > ul > li:nth-child(1) > a')
      .waitForElementVisible('#signIn > form', 3000)
      .setValue('#email', 'chizzy.korie@gmail.com')
      .setValue('#password', 'password')
      .click('#signIn > form > button')
      .assert.urlEquals('http://localhost:8000/user-menu')
      .click('.nav-container > li:nth-child(4)')
      .click('.swal-button--confirm')
      .end();
  },
};
