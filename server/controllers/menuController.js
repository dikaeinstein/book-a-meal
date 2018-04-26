const menus = [];

class MenuController {
  // Setup menu
  static setupMenu(req, res) {
    const { name, meals } = req.body;

    menus.push({
      id: menus.length + 1,
      name,
      meals,
      date: (new Date()).getDate(),
    });

    return res.status(201).json({
      message: 'Successfully setup menu for today',
      status: 'success',
      menu: menus[menus.length - 1],
    });
  }

  // Get menu for specific day
  static getMenu(req, res) {
    const error = {};
    const todayMenu = menus.filter(menu => (
      menu.date === (new Date()).getDate()
    ))[0];

    if (!todayMenu) {
      error.message = 'Menu for today have not been set';
      return res.status(404).json({ error });
    }

    return res.status(200).json({
      message: 'Successfully retrieved menu',
      status: 'success',
      menu: todayMenu,
    });
  }
}

export default MenuController;
