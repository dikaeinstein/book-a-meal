module.exports = {
  'User can place an order': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .click('.nav-container > li:nth-child(1) > a:nth-child(1)')
      .waitForElementVisible('#signIn > form', 3000)
      // Sign in
      .setValue('#email', 'chizzy.korie@gmail.com')
      .setValue('#password', 'password')
      .click('#signIn > form > button')
      .pause(2000)
      .click('div.card:nth-child(1) > button:nth-child(3)')
      .pause(1000)
      .click('#checkout > button:nth-child(3)')
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/order-confirmation')
      // Confirm order
      .click('button.btn:nth-child(2)')
      .click('.swal-button')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/user-order-history')
      .click('.nav-container > li:nth-child(4)')
      .click('.swal-button--confirm')
      .click('.nav-container > li:nth-child(1) > a:nth-child(1)')
      .waitForElementVisible('#signIn > form', 3000)
      // Sign in
      .setValue('#email', 'chizzy.korie@gmail.com')
      .setValue('#password', 'password')
      .click('#signIn > form > button')
      .pause(2000)
      .click('div.card:nth-child(1) > button:nth-child(3)')
      .pause(1000)
      .click('#checkout > button:nth-child(3)')
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/order-confirmation')
      // Confirm order
      .click('button.btn:nth-child(2)')
      .click('.swal-button')
      .pause(1000);
  },
  'User can update their order': (client) => {
    client
      .pause(2000)
      .click('button.action-btn:nth-child(1)')
      .pause(1000)
      .clearValue('#quantity')
      .setValue('#quantity', '2')
      .pause(2000)
      // Update order
      .click('button.btn[title="update order"]')
      .waitForElementVisible('.swal-button--confirm', 2000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.swal-button--confirm', 2000)
      .click('.swal-button--confirm')
      .assert
      .containsText(
        '.orders > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(5)',
        '36000',
      )
      .assert
      .containsText(
        '.orders > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(4)',
        '12',
      );
  },
  'User can cancel their order': (client) => {
    client
      .click('button.action-btn:nth-child(2)')
      .waitForElementVisible('.swal-button--confirm', 2000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.swal-button--confirm', 2000)
      .click('.swal-button--confirm')
      .assert
      .containsText(
        '.orders > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(6)',
        'cancelled',
      )
      .click('.nav-container > li:nth-child(4)')
      .click('.swal-button--confirm');
  },
  'Caterer can deliver an order': (client) => {
    client
      .waitForElementVisible('body', 2000)
      .click('#root > div > header > nav > ul > li:nth-child(1) > a')
      .waitForElementVisible('#signIn > form', 2000)
      .setValue('#email', 'ann.okwa@gmail.com')
      .setValue('#password', 'password')
      .click('#signIn > form > button')
      .waitForElementVisible(
        '.orders > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(8) > div:nth-child(1) > button:nth-child(1)',
        2000,
      )
      .click('.orders > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(8) > div:nth-child(1) > button:nth-child(1)')
      .waitForElementVisible('.swal-button--confirm', 2000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.swal-button--confirm', 2000)
      .click('.swal-button--confirm')
      .waitForElementVisible('.text-success', 1000)
      .assert.containsText('.text-success', 'delivered')
      .click('.nav-container > li:nth-child(4)')
      .click('.swal-button--confirm')
      .end();
  },
};
