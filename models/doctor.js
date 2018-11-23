'use strict';
module.exports = (sequelize, DataTypes) => {
  var Doctor = sequelize.define('Doctor', {
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
    lastName1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telephone: {
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
    },
     department: {
      type: DataTypes.STRING,
      defaultValue: true
    },
    from:{
      type: DataTypes.DATE,
      allowNull: false
    },
    to:{
        type: DataTypes.DATE,
        allowNull: false
    },
    rest_from:{
        type: DataTypes.DATE,
        allowNull: true
      },
    rest_to:{
          type: DataTypes.DATE,
          allowNull: true
      },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }  
    },
     {
    defaultScope: {
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
    },
    scopes: {
      withPassword: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
      },
      withoutData: {
        attributes: ['id', 'email']
      }
    },
    paranoid: true
  });
  Doctor.associate = function(models) {
    // associations can be defined here
    Doctor.hasMany(models.Appointment)
  
  };
  return Doctor;
};