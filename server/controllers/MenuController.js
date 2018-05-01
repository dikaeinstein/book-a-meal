const menus = [];

class MenuController {
  // Setup menu
  static setupMenu(req, res) {
    const { name, meals } = req.body;
    const date = (new Date());
    date.setUTCHours(0, 0, 0, 0);

    menus.push({
      id: menus.length + 1,
      name,
      meals,
      date: date.toISOString(),
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
    const date = (new Date());
    date.setUTCHours(0, 0, 0, 0);

    const todayMenu = menus.filter(menu => (
      menu.date === date.toISOString()
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
