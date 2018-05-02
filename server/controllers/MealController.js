let meals = [];

class MealController {
  // Get all meals
  static getAllMeals(req, res) {
    if (meals.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'There is currently no meal!',
        meals,
      });
    }
    return res.status(200).json({
      meals,
      status: 'success',
      message: 'Meals found',
    });
  }

  // Get a meal
  static getMeal(req, res) {
    const error = {};
    const matchedMeal = meals.filter(meal => (
      meal.id === parseInt(req.params.mealId, 10)
    ));
    if (!matchedMeal[0]) {
      error.id = 'Meal does not exist';
      return res.status(404).json({ error });
    }

    return res.status(200).json({
      meal: matchedMeal[0],
      status: 'success',
      message: 'Meal found',
    });
  }

  // Add meal
  static addMeal(req, res) {
    const error = {};
    const {
      name,
      description,
      imageUrl,
      price,
    } = req.body;

    const matchedMeal = meals
      .map(meal => meal.name)
      .filter(mealName => mealName === name)[0];

    if (matchedMeal) {
      error.name = 'Meal name already exist';
      return res.status(422).json({
        message: error.name,
        status: 'error',
        error,
      });
    }
    meals.push({
      id: meals.length + 1,
      name,
      description,
      imageUrl,
      price,
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
      meal.id === parseInt(req.params.mealId, 10)
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
    const filteredMeals = meals.filter(meal => (
      meal.id !== parseInt(req.params.mealId, 10)
    ));

    if ((meals.length - filteredMeals.length) === 1) {
      const deletedMeal = meals[req.params.mealId];
      meals = filteredMeals;
      return res.status(201).json({
        message: 'Meal successfully deleted',
        status: 'success',
        meal: deletedMeal,
      });
    }

    error.id = 'Meal does not exist';
    return res.status(404).json({
      error,
    });
  }
}

export default MealController;
