module.exports = {
  'Caterer can add meals': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .click('#root > div > header > nav > ul > li:nth-child(1) > a')
      .waitForElementVisible('#signIn > form', 3000)
      .setValue('#email', 'ann.okwa@gmail.com')
      .setValue('#password', 'password')
      .click('#signIn > form > button')
      .pause(3000)
      .click('.nav-container > li:nth-child(2) > a:nth-child(1)')
      .waitForElementVisible('button[data-test=addmeal]', 2000)
      .click('button[data-test=addmeal]')
      .waitForElementVisible('.add-section', 2000)
      .setValue('input[name=name]', 'Test meal')
      .setValue('input[name=price]', 3000)
      .setValue('textarea[name=description]', 'This is a test meal')
      .click('button[data-test=addmeal-submit]')
      .click('.swal-button')
      .click('button[data-test=addmeal]')
      .waitForElementVisible('.add-section', 1000)
      .setValue('input[name=name]', 'Test meal2')
      .setValue('input[name=price]', 3000)
      .setValue('textarea[name=description]', 'This is a test meal2')
      .click('button[data-test=addmeal-submit]')
      .click('.swal-button')
      .click('button[data-test=addmeal]')
      .waitForElementVisible('.add-section', 1000)
      .setValue('input[name=name]', 'Test meal3')
      .setValue('input[name=price]', 3000)
      .setValue('textarea[name=description]', 'This is a test meal3')
      .click('button[data-test=addmeal-submit]')
      .click('.swal-button')
      .assert.containsText('div[data-test=meal-1] > div:nth-child(2) > p:nth-child(1)', 'Test meal')
      .assert.containsText('div[data-test=meal-1] > div:nth-child(2) > p:nth-child(2)', '3000');
  },
  'Caterer can edit meal': (client) => {
    client
      .click('div[data-test=meal-1] > div:nth-child(3) > button[value=Edit]')
      .waitForElementVisible('.add-section', 1000)
      .clearValue('input[name=price]')
      .setValue('input[name=price]', 3500)
      .click('button[data-test=updatemeal-submit]')
      .click('.swal-button')
      .assert.containsText('div[data-test=meal-1] > div:nth-child(2) > p:nth-child(2)', '3500');
  },
  'Caterer can delete meal': (client) => {
    client
      .click('div[data-test=meal-2] > div:nth-child(3) > button[value=Delete]')
      .click('.swal-button--cancel')
      .click('div[data-test=meal-2] > div:nth-child(3) > button[value=Delete]')
      .click('.swal-button--confirm')
      .assert.elementNotPresent('div[data-test=meal-2]')
      .end();
  },
};
