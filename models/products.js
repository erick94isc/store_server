'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tpye:{
      type: DataTypes.STRING,
      allowNull: false
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
        attributes: ['id', 'title']
      }
    },
    paranoid: true
  });
  Products.associate = function(models) {
    // associations can be defined here
   
    Products.belongsToMany(models.User, {through: models.UserProducts})
  };
  return Products;
};
