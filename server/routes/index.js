import express from 'express';
import MealController from '../controllers/MealController';
import UserController from '../controllers/UserController';
import MenuController from '../controllers/MenuController';
import OrderController from '../controllers/OrderController';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';

import {
  validateAddMeal,
  validateUpdateMeal,
  validateGetMeal,
} from '../middleware/mealValidator';
import {
  validateSignin,
  validateSignup,
  validateDeleteUser,
} from '../middleware/userValidator';
import validateMenu from '../middleware/menuValidator';
import {
  validateNewOrder,
  validateUpdateOrder,
  validateGetOrder,
} from '../middleware/orderValidator';

// Setup express router
const router = express.Router();

// User sign in and sign up
router.post('/auth/signup', validateSignup, UserController.createUser);
router.post('/auth/signin', validateSignin, UserController.signinUser);
// Delete User account
router.delete('/users/:userId', validateDeleteUser, UserController.deleteUserAccount);


// Get all meals
router.get('/meals', authenticate, authorize, MealController.getAllMeals);
// Get meal
router.get('/meals/:mealId', authenticate, authorize, validateGetMeal, MealController.getMeal);
// Post meal
router.post('/meals', authenticate, authorize, validateAddMeal, MealController.addMeal);
// Update meal
router.put('/meals/:mealId', authenticate, authorize, validateUpdateMeal, MealController.updateMeal);
// Delete meal
router.delete('/meals/:mealId', authenticate, authorize, validateUpdateMeal, MealController.deleteMeal);


// Setup menu
router.post('/menu/', authenticate, authorize, validateMenu, MenuController.setupMenu);
// Get menu
router.get('/menu/', authenticate, MenuController.getMenu);


// Get all orders
router.get('/orders', authenticate, authorize, OrderController.getAllOrders);
// Post Order
router.post('/orders', authenticate, validateNewOrder, OrderController.makeAnOrder);
// Update Order
router.put('/orders/:orderId', authenticate, validateUpdateOrder, OrderController.updateOrder);
// Get Total amount made
router.get('/orders/total', authenticate, authorize, OrderController.getTotalAmount);
// Get orders for specific user
router.get('/orders/users', authenticate, OrderController.getUserOrderHistory);
router.get('/orders/users/:userId', authenticate, validateGetOrder, OrderController.getUserOrderHistory);


// Root path
router.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to Book-A-Meal api',
    status: 'success',
  })
));

export default router;
