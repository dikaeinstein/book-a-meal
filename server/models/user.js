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
    role: {
      type: DataTypes.ENUM('customer', 'caterer'),
      allowNull: false,
    },
  }, {
    underscored: true,
    underscoredAll: true,
  });

  // User.associate = (models) => {
  //   // associations can be defined here
  //   User.hasMany(models.Order, {
  //     foreignKey: 'user_id',
  //     onDelete: 'CASCADE',
  //   });
  // };
  return User;
};
