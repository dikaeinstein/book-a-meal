import { Meal } from '../models';

/**
 * @class MealController
 *
 * @export
 *
 */
class MealController {
  /**
   * @description - Get all meals
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof MenuController
   *
   * @return {Promise<object>}
   */
  static async getAllMeals(req, res) {
    const meals = await Meal.findAll();
    if (meals.length === 0) {
      return res.status(404).json({
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


  /**
   * @description - Get a single meal
   * @async
   * @static
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof MealController
   *
   * @returns {Promise<object>}
   */
  static async getMeal(req, res) {
    const error = {};
    const matchedMeal = await Meal.findOne({
      where: { id: req.params.mealId },
    });
    if (!matchedMeal) {
      error.id = 'Meal does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    return res.status(200).json({
      meal: matchedMeal,
      status: 'success',
      message: 'Meal found',
    });
  }

  /**
   * @description - Add new meal
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof - MealController
   *
   * @returns {Promise<object>}
   */
  static async addMeal(req, res) {
    const error = {};
    const {
      name,
      description,
      imageUrl,
      price,
    } = req.body;

    const matchedMeal = await Meal.findOne({
      where: { name },
    });

    if (matchedMeal) {
      error.name = 'Meal name already exist';
      return res.status(422).json({
        message: error.name,
        status: 'error',
        error,
      });
    }
    const meal = await Meal.create({
      name,
      description,
      imageUrl,
      price,
    });

    return res.status(201).json({
      message: 'Successfully added meal',
      meal,
      status: 'success',
    });
  }

  /**
   * @description - Update an existing meal
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof - MealController
   *
   * @returns {Promise<object>}
   */
  static async updateMeal(req, res) {
    const error = {};
    // Find meal
    const matchedMeal = await Meal.findOne({
      where: { id: req.params.mealId },
    });

    if (!matchedMeal) {
      error.id = 'Meal id does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    // Update meal
    const updatedMeal = await matchedMeal.update(req.body.validatedMeal);

    return res.status(200).json({
      meal: updatedMeal,
      status: 'success',
      message: 'Updated meal',
    });
  }

  /**
   * @description - Delete a meal
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof - MealController
   *
   * @returns {Promise<object>}
   */
  static async deleteMeal(req, res) {
    const error = {};
    // Find meal
    const matchedMeal = await Meal.findOne({
      where: { id: req.params.mealId },
    });

    if (!matchedMeal) {
      error.id = 'Meal does not exist';
      return res.status(404).json({
        message: error.id,
        status: 'error',
        error,
      });
    }

    await matchedMeal.destroy();
    return res.status(204).json({
      message: 'Meal successfully deleted',
      status: 'success',
    });
  }
}

export default MealController;
