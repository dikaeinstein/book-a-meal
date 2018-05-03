module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
  }, {
    underscored: true,
    underscoredAll: true,
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
