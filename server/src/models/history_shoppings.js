'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History_shoppings extends Model {
    static associate(models) {
      History_shoppings.belongsTo(models.Users, {foreignKey : 'id_user'})
      History_shoppings.belongsTo(models.Status, {foreignKey : 'status'})
    }
  };
  History_shoppings.init({
    title: DataTypes.STRING,
    photo: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    create_at: DataTypes.DATE,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History_shoppings',
  });
  return History_shoppings;
};