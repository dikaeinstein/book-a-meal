module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
    },
    expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
      field: 'updated_at',
    },
  }, {
    underscored: true,
    underscoredAll: true,
    timestamps: false,
    getterMethods: {
      userId() {
        return this.user_id;
      },
      mealId() {
        return this.meal_id;
      },
    },
    setterMethods: {
      userId(value) {
        this.setDataValue('user_id', value);
      },
      mealId(value) {
        this.setDataValue('meal_id', value);
      },
    },
  });

  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'userId',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'meal_id',
      as: 'mealId',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
