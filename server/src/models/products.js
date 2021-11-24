'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Categories, {foreignKey : 'categories'}) // Un producto tiene una categoria
      Products.belongsTo(models.Events, {foreignKey : 'id_event'}) // Un producto pertenece a un  Evento
      Products.belongsTo(models.Carts, {foreignKey : 'id'})
      Products.hasOne(models.Orders, {foreignKey : 'id_product'})
    }
  };
  Products.init({
    title: DataTypes.STRING,
    categories: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    disable: DataTypes.INTEGER,
    id_event: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};