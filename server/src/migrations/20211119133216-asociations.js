'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Objetos con las configuraciones de las relaciones
    const orders_users = {  
      fields : ['id_user'], // Columna a relacionar
      type: 'FOREIGN KEY',
      name: 'FK_1',  // Nombre de la relacion
      references: {  // Referencia con que lo voy a relacionar
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',  // Parametros 
      onUpdate: 'cascade',
    }
    const orders_products = {
        fields : ['id_product'], 
        type: 'FOREIGN KEY',
        name: 'FK_2',  
        references: { 
          table: 'Products',
          field: 'id'
        },
        onDelete: 'cascade',  
        onUpdate: 'cascade',
    }
    const users_roles = {  
      fields : ['id_role'], 
      type: 'FOREIGN KEY',
      name: 'FK_3',  
      references: {  
        table: 'Roles',
        field: 'id_rol'
      },
      onDelete: 'cascade',  
      onUpdate: 'cascade',
    }
    const products_categories = {
      fields : ['categories'], 
      type: 'FOREIGN KEY',
      name: 'FK_4',  
      references: {  
        table: 'Categories',
        field: 'category'
      },
      onDelete: 'cascade',  
      onUpdate: 'cascade',
    }
    const products_event = {
      fields : ['id_event'], 
      type: 'FOREIGN KEY',
      name: 'FK_5',  
      references: {  
        table: 'Events',
        field: 'id_event'
      },
      onDelete: 'setNull',  
      onUpdate: 'cascade',
    }
    const shopping_users = {
      fields : ['id_user'], 
      type: 'FOREIGN KEY',
      name: 'FK_6',  
      references: {  
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',  
      onUpdate: 'cascade',
    }
    const cart_users = {
      fields : ['id_user'], 
      type: 'FOREIGN KEY',
      name: 'FK_7',  
      references: {  
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',  
      onUpdate: 'cascade',
    }
    const cart_products = {
      fields : ['id_product'], 
      type: 'FOREIGN KEY',
      name: 'FK_8',  
      references: {  
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',  
      onUpdate: 'cascade',
    }

    

    await queryInterface.addConstraint('Orders', orders_users); // Establesco la relacion orders-users
    await queryInterface.addConstraint('Orders', orders_products); // Establesco la relacion orders-products
    await queryInterface.addConstraint('Users', users_roles); // Establesco la relacion users-orders
    await queryInterface.addConstraint('Products', products_categories); // Establesco la relacion products-categories
    await queryInterface.addConstraint('Products', products_event); // Establesco la relacion products-events
    await queryInterface.addConstraint('History_shoppings', shopping_users); // Establesco la relacion shopping-users
    await queryInterface.addConstraint('Carts', cart_users); // Establesco la relacion cart-users
    await queryInterface.addConstraint('Carts', cart_products); // Establesco la relacion cart-products

  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeConstraint('Orders', 'FK_1')
      await queryInterface.removeConstraint('Orders', 'FK_2')
      await queryInterface.removeConstraint('Users', 'FK_3')
      await queryInterface.removeConstraint('Products', 'FK_4')
      await queryInterface.removeConstraint('Products', 'FK_5')
      await queryInterface.removeConstraint('History_shoppings', 'FK_6')
      await queryInterface.removeConstraint('Carts', 'FK_7')
      await queryInterface.removeConstraint('Carts', 'FK_8')

  }
};
