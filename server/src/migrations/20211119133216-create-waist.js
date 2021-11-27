'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Waists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_product: {
        type: Sequelize.INTEGER
      },
      S: {
        type: Sequelize.INTEGER
      },
      M: {
        type: Sequelize.INTEGER
      },
      L: {
        type: Sequelize.INTEGER
      },
      XL: {
        type: Sequelize.INTEGER
      },
      XXL: {
        type: Sequelize.INTEGER
      },
      XXXL: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Waists');
  }
};