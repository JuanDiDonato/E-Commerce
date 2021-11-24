'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.hasMany(models.Products, {foreignKey : 'id_event'})
      //Events.belongsTo(models.Carts, {foreignKey : 'id_event'})
    }
  };
  Events.init({
    id_event : {type: DataTypes.INTEGER, primaryKey: true},
    event_name: DataTypes.STRING,
    discount: DataTypes.STRING,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};