'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserProducts = sequelize.define('UserProducts', {
    UserUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    ProductUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
    ,
  }, {})
  UserProducts.associate = function(models) {
    // associations can be defined her
   
  };
  return UserProducts;
};
