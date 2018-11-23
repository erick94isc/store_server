'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patient = sequelize.define('Patient', {
    id_patient: {
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
    blood_type: {
      type: DataTypes.STRING,
      defaultValue: false
    },
  }, {
    defaultScope: {
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
    },
    scopes: {
      withPassword: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt']}
      },
      withoutData: {
        attributes: ['id_patient', 'email']
      }
    },
    paranoid: true
  });
  Patient.associate = function(models) {
    // associations can be defined here
    Patient.hasMany(models.Appointment)
   
  };
  return Patient;
};
