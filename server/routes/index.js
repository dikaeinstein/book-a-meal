import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import MealController from '../controllers/MealController';
import UserController from '../controllers/UserController';
import MenuController from '../controllers/MenuController';
import OrderController from '../controllers/OrderController';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import authorizeSuperAdmin from '../middleware/authorizeSuperAdmin';
import validationErrorHandler from '../middleware/validationErrorHandler';
import idValidator from '../middleware/idValidator';
import queryValidator from '../middleware/queryValidator';
import dateValidator from '../middleware/dateValidator';

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
  validateUpdateMenu,
} from '../middleware/menuValidator';
import {
  validateNewOrder,
  validateUpdateOrder,
} from '../middleware/orderValidator';

// Setup express router
const router = express.Router();

// Load API documentation
const swaggerDocument = YAML.load('swagger.yml');

// Serve API docs
router.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// User sign in and sign up
router.post(
  '/v1/auth/signup', validateSignup(),
  validationErrorHandler, UserController.createUser,
);
router.post(
  '/v1/auth/signin', validateSignin(),
  validationErrorHandler, UserController.signinUser,
);


// Delete User account
router.delete(
  '/v1/users/:userId', idValidator('userId', 'User'),
  UserController.deleteUserAccount,
);


// Get all meals
router.get(
  '/v1/meals', authenticate, authorizeSuperAdmin,
  queryValidator('page'),
  queryValidator('limit'),
  validationErrorHandler,
  MealController.getAllMeals,
);

// Get meal for specific caterer
router.get(
  '/v1/meals/caterers',
  authenticate, authorize,
  queryValidator('limit'),
  queryValidator('page'),
  validationErrorHandler,
  MealController.getCatererMeals,
);
router.get(
  '/v1/meals/caterers/:userId',
  authenticate, authorizeSuperAdmin,
  idValidator('userId', 'User'),
  queryValidator('limit'),
  queryValidator('page'),
  validationErrorHandler,
  MealController.getCatererMeals,
);

// Get meal
router.get(
  '/v1/meals/:mealId', authenticate, authorize,
  idValidator('mealId', 'Meal'),
  validationErrorHandler, MealController.getMeal,
);

// Post meal
router.post(
  '/v1/meals', authenticate, authorize,
  validateAddMeal(), validationErrorHandler,
  MealController.addMeal,
);

// Update meal
router.put(
  '/v1/meals/:mealId', authenticate, authorize,
  validateUpdateMeal(), validationErrorHandler,
  MealController.updateMeal,
);

// Delete meal
router.delete(
  '/v1/meals/:mealId/users', authenticate, authorize,
  idValidator('mealId', 'Meal'), validationErrorHandler,
  MealController.deleteMeal,
);
router.delete(
  '/v1/meals/:mealId', authenticate, authorizeSuperAdmin,
  idValidator('mealId', 'Meal'), validationErrorHandler,
  MealController.deleteMeal,
);

// Setup menu
router.post(
  '/v1/menu/', authenticate, authorizeSuperAdmin,
  validateSetupMenu(), validationErrorHandler,
  MenuController.setupMenu,
);

// Get menu
router.get(
  '/v1/menu/',
  queryValidator('page'),
  queryValidator('limit'),
  validationErrorHandler,
  MenuController.getMenu,
);

// Update menu
router.put(
  '/v1/menu/', authenticate, authorizeSuperAdmin,
  idValidator('menuId', 'Menu', { optional: true }),
  validateUpdateMenu(), validationErrorHandler,
  MenuController.updateMenu,
);
router.put(
  '/v1/menu/:menuId',
  authenticate, authorizeSuperAdmin,
  idValidator('menuId', 'Menu'),
  validateUpdateMenu(), validationErrorHandler,
  MenuController.updateMenu,
);

// Delete menu
router.delete(
  '/v1/menu/:menuId', authenticate, authorizeSuperAdmin,
  idValidator('menuId', 'Menu'), validationErrorHandler,
  MenuController.deleteMenu,
);


// Get all orders
router.get(
  '/v1/orders', authenticate, authorizeSuperAdmin,
  queryValidator('limit'),
  queryValidator('page'),
  dateValidator(),
  validationErrorHandler,
  OrderController.getAllOrders,
);

// Post Order
router.post(
  '/v1/orders', authenticate,
  validateNewOrder(), validationErrorHandler,
  OrderController.makeAnOrder,
);

// Update Order
router.put(
  '/v1/orders/:orderId', authenticate,
  validateUpdateOrder(), validationErrorHandler,
  OrderController.updateOrder,
);

// Get Total amount made
router.get(
  '/v1/orders/totalAmount',
  authenticate, authorizeSuperAdmin,
  dateValidator(),
  validationErrorHandler,
  OrderController.getTotalAmount,
);

// Get Total amount made by specific caterer
router.get(
  '/v1/orders/totalAmount/caterers',
  authenticate, authorize,
  dateValidator(),
  validationErrorHandler,
  OrderController.getCatererTotalAmount,
);
router.get(
  '/v1/orders/totalAmount/caterers/:userId',
  authenticate, authorizeSuperAdmin,
  dateValidator(),
  validationErrorHandler,
  OrderController.getCatererTotalAmount,
);

// Get Total number of orders made
router.get(
  '/v1/orders/totalOrders',
  authenticate, authorizeSuperAdmin,
  dateValidator(),
  validationErrorHandler,
  OrderController.getTotalNumberOfOrders,
);

// Get Total number of meal orders made for specific caterer
router.get(
  '/v1/orders/totalOrders/caterers',
  authenticate, authorize,
  dateValidator(),
  validationErrorHandler,
  OrderController.getCatererTotalNumberOfOrders,
);
router.get(
  '/v1/orders/totalOrders/caterers/:userId',
  authenticate, authorizeSuperAdmin,
  dateValidator(),
  validationErrorHandler,
  OrderController.getCatererTotalNumberOfOrders,
);

// Get orders for specific user
router.get(
  '/v1/orders/users',
  authenticate,
  queryValidator('limit'),
  queryValidator('page'),
  validationErrorHandler,
  OrderController.getUserOrderHistory,
);
router.get(
  '/v1/orders/users/:userId',
  authenticate, authorizeSuperAdmin,
  idValidator('userId', 'User'),
  queryValidator('limit'),
  queryValidator('page'),
  validationErrorHandler,
  OrderController.getUserOrderHistory,
);

// Get meal orders for specific caterer
router.get(
  '/v1/orders/caterers',
  authenticate, authorize,
  queryValidator('limit'),
  queryValidator('page'),
  validationErrorHandler,
  OrderController.getCatererOrders,
);
router.get(
  '/v1/orders/caterers/:userId',
  authenticate, authorizeSuperAdmin,
  idValidator('userId', 'User'),
  queryValidator('limit'),
  queryValidator('page'),
  validationErrorHandler,
  OrderController.getCatererOrders,
);

// Delete specific order
router.delete(
  '/v1/orders/:orderId', authenticate, authorizeSuperAdmin,
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
