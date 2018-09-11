import { Meal, User } from '../models';
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
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
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
   * @description - Get all meals for specific user
   * @static
   * @async
   *
   * @param {object} req HTTP Request
   * @param {object} res HTTP Request
   *
   * @memberof MenuController
   *
   * @returns {Promise<JSON>}
   */
  static async getCatererMeals(req, res) {
    const userId = req.params.userId || req.userId;
    const limit = parseInt(req.query.limit, 10) || 30;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);
    const API_BASE_URL = getAPIBaseUrl();

    const resourceUrl = `${API_BASE_URL}/api/v1/meals/caterers`;

    const userMeals = await Meal.findAndCountAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      where: { user_id: userId },
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    if (userMeals.count === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No meals found!',
        meals: userMeals.rows,
      });
    }

    const totalPages = Math.ceil(userMeals.count / limit);

    // Array of links for traversing meals using pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, userMeals.count, limit);

    return res.status(200).json({
      meals: userMeals.rows,
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
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
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
    const { userId } = req;
    const {
      name,
      description,
      imageUrl,
      price,
    } = req.body;

    const matchedMeal = await Meal.findOne({
      where: { name, user_id: userId },
    });

    if (matchedMeal) {
      error.name = 'Meal name already exist';
      return res.status(422).json({
        message: error.name,
        status: 'error',
        error,
      });
    }
    const meal = imageUrl
      ? await Meal.create({
        name,
        description,
        imageUrl,
        price,
        userId,
      })
      : await Meal.create({
        name,
        description,
        price,
        userId,
      });

    const newMeal = await Meal.findById(meal.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.status(201).json({
      message: 'Successfully added meal',
      meal: newMeal,
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
    const { userId } = req;
    const { name } = req.body;

    // Find meal
    const matchedMeal = await Meal.findOne({
      where: { id: req.params.mealId, user_id: userId },
    });

    if (!matchedMeal) {
      error.mealId = 'Meal you want to update does not exist';
      return res.status(404).json({
        message: error.mealId,
        status: 'error',
        error,
      });
    }

    if (name) {
      const foundMeal = await Meal.findOne({
        where: { name, user_id: userId },
      });

      // If the foundMeal with the name is a different meal
      // then you cannot update this meal to that name because it already exist
      if (foundMeal.id !== matchedMeal.id) {
        error.name = 'You cannot update meal name to an existing meal name';
        return res.status(409).json({
          message: error.name,
          status: 'error',
          error,
        });
      }
    }

    // Update meal
    const updatedMeal = await matchedMeal.update(req.body);

    const returnedMeal = await Meal.findById(updatedMeal.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.status(200).json({
      meal: returnedMeal,
      status: 'success',
      message: 'Successfully updated meal',
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
    const { userId, role } = req;

    // Find meal
    const matchedMeal = role === 'superAdmin'
      ? await Meal.findOne({
        where: { id: req.params.mealId },
      })
      : await Meal.findOne({
        where: { id: req.params.mealId, user_id: userId },
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
