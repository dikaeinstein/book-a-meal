import express from 'express';
import MealController from '../controllers/mealController';
import UserController from '../controllers/userController';
import {
  validateAddMeal,
  validateUpdateMeal,
  validateGetMeal,
} from '../middleware/mealValidator';
import {
  validateSignin,
  validateSignup,
} from '../middleware/userValidator';

// Setup express router
const router = express.Router();

// User sign in and sign up
router.post('/auth/signup', validateSignup, UserController.createUser);
router.post('/auth/signin', validateSignin, UserController.signinUser);


// Get all meals
router.get('/meals', MealController.getAllMeals);
router.get('/meals/:id', validateGetMeal, MealController.getMeal);
// Post meal
router.post('/meals', validateAddMeal, MealController.addMeal);
// Update meal
router.put('/meals/:id', validateUpdateMeal, MealController.updateMeal);
// Delete meal
router.delete('/meals/:id', validateUpdateMeal, MealController.deleteMeal);


// Root path
router.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to Book-A-Meal api',
  })
));

export default router;
