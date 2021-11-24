'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monthly_statistics extends Model {
    static associate(models) {
      // define association here
    }
  };
  Monthly_statistics.init({
    monthly_incomes: DataTypes.STRING,
    monthly_sales: DataTypes.STRING,
    month: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Monthly_statistics',
  });
  return Monthly_statistics;
};