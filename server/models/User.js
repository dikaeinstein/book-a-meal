module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('customer', 'caterer', 'superAdmin'),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      name: 'updatedAt',
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at',
    },
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Order, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        onDelete: 'CASCADE',
      },
      as: 'user',
    });
    User.hasMany(models.Meal, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
        onDelete: 'CASCADE',
      },
    });
  };
  return User;
};
