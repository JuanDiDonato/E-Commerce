'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    static associate(models) {
      // define association here
    }
  };
  Statistics.init({
    income: DataTypes.STRING,
    sales: DataTypes.INTEGER,
    last_updated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Statistics',
  });
  return Statistics;
};