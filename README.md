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
yarn start-dev     /* Keep watching files for changes */
```

## Testing

To run tests:

```yarn
yarn test-single
yarn test          /* Keep watching files for changes */
```

## API

API is deployed at [here](https://dikaeinstein-book-a-meal.herokuapp.com/) on heroku.

### API Routes

<table>
	<tr>
		<th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/signup</td> 
		<td>/Create user account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/signin</td> 
		<td>Sign in to user account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/auth/signup</td> 
		<td>Create user account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/caterer/auth/signup</td> 
		<td>Create Admin account</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/caterer/auth/signin</td> 
		<td>Sign in to Admin account</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/meals</td> 
		<td>Get all meals</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/meals/:mealId</td> 
		<td>Get a meal</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/meals</td> 
		<td>Add new meal</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/api/v1/meals/:mealId</td> 
		<td>Update or modify meal</td>
	</tr>
	<tr>
		<td>DELETE</td>
		<td>/api/v1/meals/:mealId</td> 
		<td>Delete meal</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/menu</td> 
		<td>Setup menu</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/menu</td> 
		<td>Get menu</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders</td> 
		<td>Get all orders</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/api/v1/orders</td> 
		<td>Make an order</td>
	</tr>
	<tr>
		<td>PUT</td>
		<td>/api/v1/orders/:orderId</td> 
		<td>Modify an order</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders/total</td> 
		<td>GET total amount from orders of current day</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/api/v1/orders/users</td> 
		<td>Get order for current logged in user</td>
	</tr>
		<tr>
		<td>GET</td>
		<td>/api/v1/orders/users/:userId</td> 
		<td>Get order for the user with userId</td>
	</tr>
</table>
