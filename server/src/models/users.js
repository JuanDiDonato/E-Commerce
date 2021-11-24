'use strict';
const {Model} = require('sequelize');
const {EncryptPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Roles) // Un usuario tiene un rol
      Users.hasOne(models.Carts, {foreignKey : 'id_user'}) // Un usuario tiene un carrito
      Users.hasOne(models.History_shoppings, {foreignKey : 'id_user'})
      Users.hasOne(models.Orders, {foreignKey : 'id_user'})

    }
  };
  Users.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id_role: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.beforeCreate(EncryptPassword);
  Users.beforeUpdate(EncryptPassword);
  return Users;
};