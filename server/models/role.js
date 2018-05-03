module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underScored: true,
    underScoredAll: true,
  });

  Role.associate = (models) => {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE',
    });
  };
  return Role;
};
