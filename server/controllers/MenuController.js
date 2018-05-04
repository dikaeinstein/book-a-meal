import format from 'date-fns/format';
import { Op } from 'sequelize';
import { Menu, Meal } from '../models';

class MenuController {
  // Setup menu
  static async setupMenu(req, res) {
    const { name, mealIds } = req.body;

    const menu = await Menu.create({
      name,
    });
    // Insert into many-to-many table
    await menu.addMeals(mealIds);
    const returnedMenu = await Menu.findOne({
      include: [{
        model: Meal,
        attributes: ['id', 'name'],
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

  // Get menu for specific day
  static async getMenu(req, res) {
    const error = {};
    // Use current date as default
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    const todayMenu = await Menu.findOne({
      include: [{
        model: Meal,
        attributes: ['id', 'name'],
        as: 'meals',
        through: { attributes: [] },
      }],
      where: {
        created_at: {
          [Op.gte]: format(currentDate.toISOString()),
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
}

export default MenuController;
