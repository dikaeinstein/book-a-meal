module.exports = {
  'User can visit landing page': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 3000)
      .assert.containsText('h1', 'Book-A-Meal')
      .end();
  },
};
