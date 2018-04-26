const menus = [];

class MenuController {
  // Setup menu
  static setupMenu(req, res) {
    const { name, meals } = req.body;

    menus.push({
      id: menus.length + 1,
      name,
      meals,
    });

    return res.status(201).json({
      message: 'Successfully setup menu for today',
      status: 'success',
      menu: menus[menus.length - 1],
    });
  }
}

export default MenuController;
