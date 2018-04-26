import express from 'express';
import MealController from '../controllers/mealController';
import UserController from '../controllers/userController';
import MenuController from '../controllers/menuController';
import OrderController from '../controllers/orderController';
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
} from '../middleware/userValidator';
import validateMenu from '../middleware/menuValidator';
import {
  validateNewOrder,
  validateUpdateOrder,
} from '../middleware/orderValidator';

// Setup express router
const router = express.Router();

// Customer sign in and sign up
router.post('/auth/signup', validateSignup, UserController.createUser);
router.post('/auth/signin', validateSignin, UserController.signinUser);

// Caterer(Admin) sign in and sign up
router.post('/caterer/auth/signup', validateSignup, UserController.createUser);
router.post('/caterer/auth/signin', validateSignin, UserController.signinUser);


// Get all meals
router.get('/meals', MealController.getAllMeals);
router.get('/meals/:id', validateGetMeal, MealController.getMeal);
// Post meal
router.post('/meals', authenticate, authorize, validateAddMeal, MealController.addMeal);
// Update meal
router.put('/meals/:id', authenticate, authorize, validateUpdateMeal, MealController.updateMeal);
// Delete meal
router.delete('/meals/:id', authenticate, authorize, validateUpdateMeal, MealController.deleteMeal);


// Setup menu
router.post('/menus', authenticate, authorize, validateMenu, MenuController.setupMenu);
// Get menu
router.get('/menus', authenticate, MenuController.getMenu);


// Get all orders
router.get('/orders', authenticate, OrderController.getAllOrders);
// Post Order
router.post('/orders', authenticate, validateNewOrder, OrderController.makeAnOrder);
// Update Order
router.put('/orders/:id', authenticate, validateUpdateOrder, OrderController.updateOrder);

// Root path
router.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to Book-A-Meal api',
  })
));

export default router;
