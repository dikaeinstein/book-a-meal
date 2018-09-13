require('dotenv').config();

module.exports = {
  'Super Admin can setup menu': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .click('.nav-container > li:nth-child(1) > a:nth-child(1)')
      .waitForElementVisible('#signIn > form', 3000)
      .setValue('#email', process.env.email)
      .setValue('#password', process.env.password)
      .click('#signIn > form > button')
      .pause(3000)
      .click('.nav-container > li:nth-child(3) > a:nth-child(1)')
      .waitForElementVisible('button[data-test=setup-menu]', 2000)
      .click('button[data-test=setup-menu]')
      .waitForElementVisible('.form', 1000)
      .click('.form > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)')
      .assert
      .attributeEquals(
        '.form > div:nth-child(3) > div:nth-child(2) > input:nth-child(1)',
        'checked', 'true',
      )
      .click('button[value="Set Menu"]')
      .click('.swal-button')
      .waitForElementVisible('.menu > h4.text-center', 2000)
      .assert
      .containsText('.menu > h4.text-center', 'Menu for Today')
      .assert
      .containsText(
        '.menu table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)',
        'Test meal3',
      )
      .assert
      .containsText(
        '.menu table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)',
        '3000',
      );
  },
  'Super Admin can update menu': (client) => {
    client
      .click('button[data-test=update-menu]')
      .waitForElementVisible('.form', 1000)
      .click('.form > div:nth-child(3) > div:nth-child(3) > input:nth-child(1)')
      .assert
      .attributeEquals(
        '.form > div:nth-child(3) > div:nth-child(3) > input:nth-child(1)',
        'checked', 'true',
      )
      .click('button[value="Set Menu"]')
      .click('.swal-button')
      .waitForElementVisible('.menu > h4.text-center', 2000)
      .assert
      .containsText('.menu > h4.text-center', 'Menu for Today')
      .assert
      .containsText(
        '.menu table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)',
        'Test meal',
      )
      .assert
      .containsText(
        '.menu table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)',
        '3500',
      )
      .end();
  },
};
