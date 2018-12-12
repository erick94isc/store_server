'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
   }, {
    defaultScope: {
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
    },
    scopes: {
      withPassword: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
      },
      withoutData: {
        attributes: ['id']
      }
    },
    paranoid: true,
    tableName: 'User'
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Products, {through: models.UserProducts});
   
  };
  return User;
};
