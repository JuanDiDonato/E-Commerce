'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Waist extends Model {
    static associate(models) {
      Waist.hasOne(models.Products, {foreignKey : 'id'})
    }
  };
  Waist.init({
    id_product : DataTypes.INTEGER,
    S: DataTypes.INTEGER,
    M: DataTypes.INTEGER,
    L: DataTypes.INTEGER,
    XL: DataTypes.INTEGER,
    XXL: DataTypes.INTEGER,
    XXXL: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Waist',
  });
  return Waist;
};