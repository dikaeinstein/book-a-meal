module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
    status: {
      type: DataTypes.ENUM('delivered', 'cancelled', 'pending'),
      defaultValue: 'pending',
      allowNull: false,
    },
  }, {
    underscored: true,
    underscoredAll: true,
  });

  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'meal_id',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
