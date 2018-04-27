# book-a-meal
Book-A-Meal is an application that allows customers to make food orders and helps the food vendor know what the customers want to eat

[![Build Status](https://travis-ci.org/Dikaeinstein/book-a-meal.svg?branch=ch-integrate-test-coverage-reporting-157145129)](https://travis-ci.org/Dikaeinstein/book-a-meal)
[![Coverage Status](https://coveralls.io/repos/github/Dikaeinstein/book-a-meal/badge.svg?branch=ch-integrate-test-coverage-reporting-157145129)](https://coveralls.io/github/Dikaeinstein/book-a-meal?branch=ch-integrate-test-coverage-reporting-157145129)
[![Maintainability](https://api.codeclimate.com/v1/badges/1104abe96a3ded2f2b39/maintainability)](https://codeclimate.com/github/Dikaeinstein/book-a-meal/maintainability)

**View UI template:** [Click](https://dikaeinstein.github.io/book-a-meal/UI/index.html)

## Features

### Users

- Signup and Login
- Make an Order
- Modify an Order
- View Menu for the Day
- View their Order History

### Caterer

- Create meals
- Modiy meals
- Delete meals
- Setup menu for P0articular Day
- Get All Orders for a Specific Day
- Get All Orders for a Specific User
- View Order Summary for Specific Day

## Installation

Clone repo to your local machine:

```git
git clone https://github.com/Dikaeinstein/book-a-meal.git
```

**Install dependencies and run locally**<br/>
*Note>> Install yarn if not already installed on local machine: 'npm i -g yarn'*

Then run:

```yarn
yarn install
```

Create .env like the .env.sample file, just replace with your own enviroment variables.

Now start the server:

```yarn
yarn start
yarn start-dev     /* to watch for file changes */
```