module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'http://res.cloudinary.com/dikaeinstein/image/upload/c_scale,q_auto:low,w_1029/v1525566673/book-a-meal/avocado-cooked-delicious-262959.jpg',
      field: 'image_url',
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
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  });

  Meal.associate = (models) => {
    // associations can be defined here
    Meal.hasMany(models.Order, {
      foreignKey: {
        name: 'mealId',
        field: 'meal_id',
        onDelete: 'CASCADE',
      },
    });
    Meal.belongsToMany(models.Menu, {
      through: 'meal_menus',
      foreignKey: {
        name: 'mealId',
        field: 'meal_id',
      },
    });
  };
  return Meal;
};
