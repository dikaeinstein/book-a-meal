import express from 'express';
import MealsController from '../controllers/mealController';
import {
  validateAddMeal,
  validateUpdateMeal,
  validateGetMeal,
} from '../middleware/mealValidator';

// Setup express router
const router = express.Router();

// Get all meals
router.get('/meals', MealsController.getAllMeals);
router.get('/meals/:id', validateGetMeal, MealsController.getMeal);
// Post meal
router.post('/meals', validateAddMeal, MealsController.addMeal);
// Update meal
router.put('/meals/:id', validateUpdateMeal, MealsController.updateMeal);
// Delete meal
router.delete('/meals/:id', validateUpdateMeal, MealsController.deleteMeal);

// Root path
router.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to Book-A-Meal api',
  })
));

export default router;
