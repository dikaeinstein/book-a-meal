import { Meal } from '../models';
import { linksURIBuilder } from '../lib/pagination';
import getAPIBaseUrl from '../lib/getAPIBaseUrl';

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
    const limit = parseInt(req.query.limit, 10) || 30;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);
    const API_BASE_URL = getAPIBaseUrl();

    const resourceUrl = `${API_BASE_URL}/api/v1/meals`;

    const meals = await Meal.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    if (meals.count === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'There is currently no meal!',
        meals: meals.rows,
      });
    }

    const totalPages = Math.ceil(meals.count / limit);

    // Array of links for traversing meals using pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, meals.count, limit);

    return res.status(200).json({
      meals: meals.rows,
      status: 'success',
      message: 'Meals successfully retrieved',
      links,
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
    let meal;
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
    if (imageUrl) {
      meal = await Meal.create({
        name,
        description,
        imageUrl,
        price,
      });
    } else {
      meal = await Meal.create({
        name,
        description,
        price,
      });
    }

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
    try {
      const updatedMeal = await matchedMeal.update(req.body);

      return res.status(200).json({
        meal: updatedMeal,
        status: 'success',
        message: 'Successfully updated meal',
      });
    } catch (err) {
      error.name = err.errors[0].message;
      return res.status(409).json({
        message: 'You cannot update meal name to an existing meal name',
        status: 'error',
        error,
      });
    }
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
      error.mealId = 'Meal does not exist';
      return res.status(404).json({
        message: error.mealId,
        status: 'error',
        error,
      });
    }

    await matchedMeal.destroy();
    return res.status(200).json({
      message: 'Meal successfully deleted',
      status: 'success',
    });
  }
}

export default MealController;
