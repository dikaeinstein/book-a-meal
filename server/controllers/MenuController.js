import { Op } from 'sequelize';
import { Menu, Meal, User } from '../models';
import getAPIBaseUrl from '../lib/getAPIBaseUrl';
import buildCheckMealsQuery from '../lib/buildCheckMealsQuery';
import { linksURIBuilder, menuMealsCount } from '../lib/pagination';

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
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);
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

    const menuMeals = await menu.getMeals({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      joinTableAttributes: [],
    });
    const count = await menuMealsCount(menu.id);

    const totalPages = Math.ceil(count / limit);

    // Build links for pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, count, limit);
    const returnMenu = {
      id: menu.id,
      name: menu.name,
      meals: menuMeals,
      createdAt: menu.createdAt,
      updateAt: menu.updateAt,
    };

    return res.status(201).json({
      message: 'Successfully setup menu for today',
      status: 'success',
      menu: returnMenu,
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
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);
    const error = {};
    const API_BASE_URL = getAPIBaseUrl();

    const resourceUrl = `${API_BASE_URL}/api/v1/menu/`;

    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const todayMenu = await Menu.findOne({
      where: {
        created_at: {
          [Op.gt]: new Date(currentDate - (24 * 60 * 60 * 1000)),
          [Op.lt]: new Date(currentDate.setDate(currentDate.getDate() + 1)),
        },
      },
    });

    if (!todayMenu) {
      error.message = 'Menu for today have not been set';
      return res.status(404).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    const menuMeals = await todayMenu.getMeals({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      joinTableAttributes: [],
    });
    const count = await menuMealsCount(todayMenu.id);

    const totalPages = Math.ceil(count / limit);

    // Build links for pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, count, limit);
    const menu = {
      id: todayMenu.id,
      name: todayMenu.name,
      meals: menuMeals,
      createdAt: todayMenu.createdAt,
      updateAt: todayMenu.updateAt,
    };

    return res.status(200).json({
      message: 'Successfully retrieved menu',
      status: 'success',
      menu,
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
    const page = parseInt(req.query.page, 10) || 1;
    const offset = limit * (page - 1);
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

    const updatedMenuMeals = await matchedMenu.getMeals({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      joinTableAttributes: [],
    });
    const count = await menuMealsCount(matchedMenu.id);

    const totalPages = Math.ceil(count / limit);

    // Build links for pagination
    const links = linksURIBuilder(resourceUrl, page, totalPages, count, limit);
    const menu = {
      id: matchedMenu.id,
      name: matchedMenu.name,
      meals: updatedMenuMeals,
      createdAt: matchedMenu.createdAt,
      updateAt: matchedMenu.updateAt,
    };

    return res.status(200).json({
      message: 'Successfully updated menu',
      status: 'success',
      menu,
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
