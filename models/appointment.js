'use strict';
module.exports = (sequelize, DataTypes) => {
  var Appointment = sequelize.define('Appointment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
     },
    description:{
      type: DataTypes.STRING,
      allowNull: true
     }
    },
     {
    defaultScope: {
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
    },
    paranoid: true
  });
  Appointment.associate = function(models) {
    // associations can be defined here
    Appointment.belongsTo(models.Patient,{ as: 'of', foreignKey: 'id_patient'})
    Appointment.belongsTo(models.Doctor,{ as: 'attendedBy', foreignKey: 'id'})
  };
  return Appointment;
};



