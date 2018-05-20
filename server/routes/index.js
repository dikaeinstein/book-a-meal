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
import {
  validateSetupMenu,
  validateUpateMenu,
} from '../middleware/menuValidator';
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
router.post('/menu/', authenticate, authorize, validateSetupMenu, MenuController.setupMenu);
// Get menu
router.get('/menu/', authenticate, MenuController.getMenu);
// Update menu
router.put('/menu/:menuId', authenticate, authorize, validateUpateMenu, MenuController.updateMenu);


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
// Delete specific order
router.delete('/orders/:orderId', authenticate, authorize, validateGetOrder, OrderController.deleteOrder);


router.all('*', (req, res) => {
  const error = {
    message: "I'm pretty sure this is not what you are looking for, please enter a valid route",
  };
  return res.status(404).json({
    message: error.message,
    status: 'error',
    error,
  });
});

export default router;
