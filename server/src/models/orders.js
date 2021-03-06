'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, {foreignKey : 'id_user'})
      Orders.belongsTo(models.Products, {foreignKey : 'id_product'})
    }
  };
  Orders.init({
    id_order:  {type : DataTypes.INTEGER, primaryKey: true},
    id_user:  DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    id_product: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};