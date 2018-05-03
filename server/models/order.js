module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    underscored: true,
    underscoredAll: true,
  });

  // Order.associate = (models) => {
  //   // associations can be defined here
  //   Order.belongsTo(models.User, {
  //     foreignKey: 'user_id',
  //     onDelete: 'CASCADE',
  //   });
  //   Order.belongsTo(models.Meal, {
  //     foreignKey: 'meal_id',
  //     onDelete: 'CASCADE',
  //   });
  //   Order.belongsTo(models.OrderStatus, {
  //     foreignKey: 'order_status_id',
  //     onDelete: 'CASCADE',
  //   });
  // };
  return Order;
};
