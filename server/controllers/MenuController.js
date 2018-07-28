import { Op } from 'sequelize';
import { Menu, Meal } from '../models';

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
    const error = {};
    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const matchedMenu = await Menu.findOne({
      where: {
        created_at: {
          [Op.gte]: currentDate,
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

    const menu = await Menu.create({ name });
    // Insert into many-to-many table
    await menu.addMeals(mealIds);
    const returnedMenu = await Menu.findById(menu.id, {
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'description', 'price', 'imageUrl'],
        as: 'meals',
        through: { attributes: [] },
      }],
    });
    return res.status(201).json({
      message: 'Successfully setup menu for today',
      status: 'success',
      menu: returnedMenu,
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
    const error = {};
    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const todayMenu = await Menu.findOne({
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'description', 'price', 'imageUrl'],
        as: 'meals',
        through: { attributes: [] },
      }],
      where: {
        created_at: {
          [Op.gte]: currentDate,
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

    return res.status(200).json({
      message: 'Successfully retrieved menu',
      status: 'success',
      menu: todayMenu,
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
    const { mealIds } = req.body;
    const { menuId } = req.params;
    const error = {};
    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    let matchedMenu;
    if (!menuId) {
      matchedMenu = await Menu.findOne({
        where: {
          created_at: {
            [Op.gte]: currentDate,
          },
        },
      });
    } else {
      matchedMenu = await Menu.findById(menuId);
    }

    if (!matchedMenu) {
      error.message = 'Menu not found or have not been setup';
      return res.status(404).json({
        message: error.message,
        status: 'error',
        error,
      });
    }

    // Insert into many-to-many table
    await matchedMenu.setMeals(mealIds);
    const returnedMenu = await Menu.findById(matchedMenu.id, {
      include: [{
        model: Meal,
        attributes: ['id', 'name', 'description', 'price', 'imageUrl'],
        as: 'meals',
        through: { attributes: [] },
      }],
    });
    return res.status(200).json({
      message: 'Successfully updated menu',
      status: 'success',
      menu: returnedMenu,
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
