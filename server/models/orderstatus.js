module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define('order_status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    underscoredAll: true,
  });

  OrderStatus.associate = (models) => {
    // associations can be defined here
    OrderStatus.hasMany(models.Order, {
      foreignKey: 'order_status_id',
      as: 'status',
    });
  };
  return OrderStatus;
};
