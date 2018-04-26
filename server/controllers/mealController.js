let meals = [];

class MealController {
  // Get all meals
  static getAllMeals(req, res) {
    return res.status(200).json({
      meals,
      status: 'success',
      message: 'Meals found',
    });
  }

  // Get a meal
  static getMeal(req, res) {
    const error = {};
    const mealResponse = meals.filter(meal => (
      meal.id === parseInt(req.params.id, 10)
    ));
    if (!mealResponse[0]) {
      error.id = 'Meal does not exist';
      return res.status(404).json({ error });
    }

    return res.status(200).json({
      meal: mealResponse[0],
      status: 'success',
      message: 'Meal found',
    });
  }

  // Add meal
  static addMeal(req, res) {
    const {
      name,
      description,
      imageUrl,
    } = req.body;

    meals.push({
      id: meals.length + 1,
      name,
      description,
      imageUrl,
    });

    return res.status(201).json({
      message: 'Successfully added meal',
      meal: meals[meals.length - 1],
      status: 'success',
    });
  }

  // Update meal
  static updateMeal(req, res) {
    const error = {};
    // Filter meals
    const matchedMeal = meals.filter(meal => (
      meal.id === parseInt(req.params.id, 10)
    ))[0];

    if (!matchedMeal) {
      error.id = 'Meal id does not exist';
      return res.status(404).json({ error });
    }

    // Merge changes
    const updatedMeal = Object
      .assign(matchedMeal, req.body.validatedMeal);

    return res.status(200).json({
      meal: updatedMeal,
      status: 'success',
      message: 'Updated meal',
    });
  }

  // Delete meal
  static deleteMeal(req, res) {
    const error = {};
    // Delete meal by return a new filtered array without the meal
    const filteredMeals = meals.filter(meal => (
      meal.id !== parseInt(req.params.id, 10)
    ));

    if ((meals.length - filteredMeals.length) === 1) {
      meals = filteredMeals;
      return res.status(201).json({
        message: 'Meal successfully deleted',
        status: 'success',
      });
    }

    error.id = 'Meal does not exist';
    return res.status(404).json({
      error,
    });
  }
}

export default MealController;
