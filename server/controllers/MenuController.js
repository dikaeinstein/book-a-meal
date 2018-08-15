import { Op } from 'sequelize';
import { Menu, Meal } from '../models';
import getAPIBaseUrl from '../lib/getAPIBaseUrl';
import buildCheckMealsQuery from '../lib/buildCheckMealsQuery';

/**
 * @class MenuController
 *
 * @export
 */

class MenuController {
  /**
   * @description - Setup menu for specific day
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof MenuController
   *
   * @returns {Promise<object>}
   */
  static async setupMenu(req, res) {
    const { name, mealIds } = req.body;
    const limit = parseInt(req.query.limit, 10) || 30;
    const start = parseInt(req.query.start, 10) || 1;
    const error = {};

    const API_BASE_URL = getAPIBaseUrl();
    const resourceUrl = `${API_BASE_URL}/api/v1/menu/`;

    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const matchedMenu = await Menu.findOne({
      where: {
        created_at: {
          [Op.gt]: new Date(currentDate - (24 * 60 * 60 * 1000)),
          [Op.lt]: new Date(currentDate.setDate(currentDate.getDate() + 1)),
        },
      },
    });

    if (matchedMenu) {
      error.message = 'Menu for the day have been set';
      return res.status(409).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    // Check mealIds
    const query = buildCheckMealsQuery(mealIds);
    const result = await Meal.find(query);
    if (!result.allmealsavailable) {
      error.mealIds = `One or more meal cannot be found, 
please include meal that exist when setting up menu`;
      return res.status(404).json({
        message: error.mealIds,
        status: 'error',
        error,
      });
    }

    const menu = await Menu.create({ name });

    // Insert into many-to-many table
    await menu.addMeals(mealIds);

    const returnedMenu = await Menu.findById(menu.id, {
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'description', 'price', 'imageUrl'],
          as: 'meals',
          through: { attributes: [] },
          required: false,
          where: {
            id: {
              [Op.gte]: start,
            },
          },
        },
      ],
      subQuery: false,
      limit,
    });

    // Sort menu meals in place
    returnedMenu.meals.sort((a, b) => (
      parseInt(a.id, 10) - parseInt(b.id, 10)
    ));

    const lastIndex = returnedMenu.meals.length - 1;
    const lastMeal = returnedMenu.meals[lastIndex];
    // Array of links for traversing menu meals using pagination
    const links = [
      {
        rel: 'next',
        href: `${resourceUrl}?limit=${limit}&start=${
          lastMeal ? lastMeal.id + 1 : start}`,
      },
      {
        rel: 'self',
        href: `${resourceUrl}?limit=${limit}&start=${start}`,
      },
    ];

    return res.status(201).json({
      message: 'Successfully setup menu for today',
      status: 'success',
      menu: returnedMenu,
      links,
    });
  }

  /**
   * @description - Get menu for specific day
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof MenuController
   *
   * @returns {Promise<object>}
   */
  static async getMenu(req, res) {
    const limit = parseInt(req.query.limit, 10) || 30;
    const start = parseInt(req.query.start, 10) || 1;
    const previous = Boolean(parseInt(req.query.previous, 10));
    const error = {};
    const API_BASE_URL = getAPIBaseUrl();

    const resourceUrl = `${API_BASE_URL}/api/v1/menu/`;

    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    let include = {
      model: Meal,
      attributes: ['id', 'name', 'description', 'price', 'imageUrl'],
      as: 'meals',
      through: { attributes: [] },
      required: false,
    };

    include = previous ? {
      ...include,
      where: {
        id: {
          [Op.lt]: start,
          [Op.gte]: 1,
        },
      },
    } : {
      ...include,
      where: {
        id: {
          [Op.gte]: start,
        },
      },
    };

    const todayMenu = await Menu.findOne({
      include: [include],
      where: {
        created_at: {
          [Op.gt]: new Date(currentDate - (24 * 60 * 60 * 1000)),
          [Op.lt]: new Date(currentDate.setDate(currentDate.getDate() + 1)),
        },
      },
      limit,
      subQuery: false,
    });

    if (!todayMenu) {
      error.message = 'Menu for today have not been set';
      return res.status(404).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    // Sort menu meals in place
    todayMenu.meals.sort((a, b) => (
      parseInt(a.id, 10) - parseInt(b.id, 10)
    ));

    const firstMeal = todayMenu.meals[0];
    const lastIndex = todayMenu.meals.length - 1;
    const lastMeal = todayMenu.meals[lastIndex];
    // Array of links for traversing menu meals using pagination
    const links = [
      {
        rel: 'next',
        href: `${resourceUrl}?limit=${limit}&start=${
          lastMeal ? lastMeal.id + 1 : start}`,
      },
      {
        rel: 'previous',
        href: `${resourceUrl}?limit=${limit}&start=${
          firstMeal ? firstMeal.id : start}&previous=true`,
      },
      {
        rel: 'self',
        href: `${resourceUrl}?limit=${limit}&start=${start}`,
      },
    ];

    return res.status(200).json({
      message: 'Successfully retrieved menu',
      status: 'success',
      menu: todayMenu,
      links,
    });
  }

  /**
   * @description - Setup menu for specific day
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof MenuController
   *
   * @returns {Promise<object>}
   */
  static async updateMenu(req, res) {
    const limit = parseInt(req.query.limit, 10) || 30;
    const start = parseInt(req.query.start, 10) || 1;
    const { name, mealIds } = req.body;
    const { menuId } = req.params;
    const error = {};

    const API_BASE_URL = getAPIBaseUrl();
    const resourceUrl = `${API_BASE_URL}/api/v1/menu/`;
    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const matchedMenu = menuId
      ? await Menu.findById(menuId)
      : await Menu.findOne({
        where: {
          created_at: {
            [Op.gt]: new Date(currentDate - (24 * 60 * 60 * 1000)),
            [Op.lt]: new Date(currentDate.setDate(currentDate.getDate() + 1)),
          },
        },
      });

    if (!matchedMenu) {
      error.message = 'Menu not found or have not been setup';
      return res.status(404).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    if (name) {
      await matchedMenu.update({ name });
    }

    if (mealIds) {
      // Check mealIds
      const query = buildCheckMealsQuery(mealIds);
      const result = await Meal.find(query);
      if (!result.allmealsavailable) {
        error.mealIds = `One or more meal cannot be found, 
please include meal that exist when setting up menu`;
        return res.status(404).json({
          message: error.mealIds,
          status: 'error',
          error,
        });
      }
      // Insert into many-to-many table
      await matchedMenu.setMeals(mealIds);
    }

    const returnedMenu = await Menu.findById(matchedMenu.id, {
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'description', 'price', 'imageUrl'],
        as: 'meals',
        through: { attributes: [] },
        where: {
          id: {
            [Op.gte]: start,
          },
        },
      }],
      limit,
      subQuery: false,
    });

    // Sort menu meals in place
    returnedMenu.meals.sort((a, b) => (
      parseInt(a.id, 10) - parseInt(b.id, 10)
    ));

    const lastIndex = returnedMenu.meals.length - 1;
    const lastMeal = returnedMenu.meals[lastIndex];
    // Array of links for traversing menu meals using pagination
    const links = [
      {
        rel: 'next',
        href: `${resourceUrl}?limit=${limit}&start=${
          lastMeal ? lastMeal.id + 1 : start}`,
      },
      {
        rel: 'self',
        href: `${resourceUrl}?limit=${limit}&start=${start}`,
      },
    ];

    return res.status(200).json({
      message: 'Successfully updated menu',
      status: 'success',
      menu: returnedMenu,
      links,
    });
  }

  /**
   * @description - Delete menu
   * @static
   * @async
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Request
   *
   * @returns {Promise<object>}
   */
  static async deleteMenu(req, res) {
    const { menuId } = req.params;
    const error = {};

    const matchedMenu = await Menu.findById(menuId);

    if (!matchedMenu) {
      error.message = 'Menu does not exist';
      return res.status(404).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    await matchedMenu.destroy();
    return res.status(200).json({
      message: 'Menu successfully deleted',
      status: 'success',
    });
  }
}

export default MenuController;
