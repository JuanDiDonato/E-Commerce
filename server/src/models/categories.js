'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(models.Products, {  // Una categoria pertenece a un producto
        foreignKey: 'categories'
      })
    }
  };
  Categories.init({
    category: {
      type : DataTypes.STRING,
      primaryKey: true // evita que cree la columna id por defecto
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};