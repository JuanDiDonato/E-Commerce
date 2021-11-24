'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique : true
      },
      password: {
        type: Sequelize.STRING
      },
      id_role: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};