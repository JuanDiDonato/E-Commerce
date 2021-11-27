'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasOne(models.Orders, {foreignKey : 'id'})
      Status.hasOne(models.History_shoppings, {foreignKey : 'id'})
    }
  };
  Status.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};