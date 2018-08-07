module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('delivered', 'cancelled', 'pending'),
      defaultValue: 'pending',
    },
    expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  });

  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        onDelete: 'CASCADE',
      },
      as: 'user',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: {
        name: 'mealId',
        field: 'meal_id',
        onDelete: 'CASCADE',
      },
      as: 'meal',
    });
  };
  return Order;
};
