'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('clientes', { 
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
       nome: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       cpf:{
         type: Sequelize.STRING,
         allowNull: false,
       },
       tel:{
        type: Sequelize.STRING,
        allowNull: true,
       },
       celular: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       email: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       
       created_at: {
         type:Sequelize.DATE,
         allowNull: false,
       },
       updated_at: {
        type:Sequelize.DATE,
        allowNull: false,
      },

       });
     
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.dropTable('clientes');
   
  }
};
