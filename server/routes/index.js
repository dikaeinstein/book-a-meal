import express from 'express';
import MealController from '../controllers/MealController';
import UserController from '../controllers/UserController';
import MenuController from '../controllers/MenuController';
import OrderController from '../controllers/OrderController';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import validationErrorHandler from '../middleware/validationErrorHandler';
import idValidator from '../middleware/idValidator';

import {
  validateAddMeal,
  validateUpdateMeal,
} from '../middleware/mealValidator';
import {
  validateSignin,
  validateSignup,
} from '../middleware/userValidator';
import {
  validateSetupMenu,
  validateUpateMenu,
} from '../middleware/menuValidator';
import {
  validateNewOrder,
  validateUpdateOrder,
} from '../middleware/orderValidator';

// Setup express router
const router = express.Router();

// User sign in and sign up
router.post(
  '/auth/signup', validateSignup(),
  validationErrorHandler, UserController.createUser,
);
router.post(
  '/auth/signin', validateSignin(),
  validationErrorHandler, UserController.signinUser,
);


// Delete User account
router.delete(
  '/users/:userId', idValidator('userId', 'User'),
  UserController.deleteUserAccount,
);


// Get all meals
router.get(
  '/meals', authenticate, authorize,
  MealController.getAllMeals,
);

// Get meal
router.get(
  '/meals/:mealId', authenticate, authorize,
  idValidator('mealId', 'Meal'),
  validationErrorHandler, MealController.getMeal,
);

// Post meal
router.post(
  '/meals', authenticate, authorize,
  validateAddMeal(), validationErrorHandler,
  MealController.addMeal,
);

// Update meal
router.put(
  '/meals/:mealId', authenticate, authorize,
  validateUpdateMeal(), validationErrorHandler,
  MealController.updateMeal,
);

// Delete meal
router.delete(
  '/meals/:mealId', authenticate, authorize,
  idValidator('mealId', 'Meal'), validationErrorHandler,
  MealController.deleteMeal,
);


// Setup menu
router.post(
  '/menu/', authenticate, authorize,
  validateSetupMenu(), validationErrorHandler,
  MenuController.setupMenu,
);

// Get menu
router.get('/menu/', MenuController.getMenu);

// Update menu
router.put(
  '/menu/', authenticate, authorize,
  idValidator('menuId', 'Menu', { optional: true }),
  validateUpateMenu(), validationErrorHandler,
  MenuController.updateMenu,
);
router.put(
  '/menu/:menuId',
  authenticate, authorize,
  idValidator('menuId', 'Menu'),
  validateUpateMenu(), validationErrorHandler,
  MenuController.updateMenu,
);

// Delete menu
router.delete(
  '/menu/:menuId', authenticate, authorize,
  idValidator('menuId', 'Menu'), validationErrorHandler,
  MenuController.deleteMenu,
);


// Get all orders
router.get(
  '/orders', authenticate, authorize,
  OrderController.getAllOrders,
);

// Post Order
router.post(
  '/orders', authenticate,
  validateNewOrder(), validationErrorHandler,
  OrderController.makeAnOrder,
);

// Update Order
router.put(
  '/orders/:orderId', authenticate,
  validateUpdateOrder(), validationErrorHandler,
  OrderController.updateOrder,
);

// Get Total amount made
router.get(
  '/orders/totalAmount',
  authenticate, authorize,
  OrderController.getTotalAmount,
);

// Get Total number of orders made
router.get(
  '/orders/totalOrders',
  authenticate, authorize,
  OrderController.getTotalNumberOfOrders,
);

// Get orders for specific user
router.get(
  '/orders/users',
  authenticate,
  OrderController.getUserOrderHistory,
);
router.get(
  '/orders/users/:userId',
  authenticate, idValidator('userId', 'User'),
  validationErrorHandler,
  OrderController.getUserOrderHistory,
);

// Delete specific order
router.delete(
  '/orders/:orderId', authenticate, authorize,
  idValidator('orderId', 'Order'), validationErrorHandler,
  OrderController.deleteOrder,
);


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
