'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    static associate(models) {
      Carts.belongsTo(models.Products, { foreignKey : 'id_product'})
      Carts.belongsTo(models.Users, { foreignKey : 'id_user'})
    }
  };
  Carts.init({
    id_cart: {type :DataTypes.INTEGER, primaryKey: true},
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.STRING,
    waist : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};