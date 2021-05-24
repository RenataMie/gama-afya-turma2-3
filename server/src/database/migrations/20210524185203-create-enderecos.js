'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.createTable('enderecos', { 
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
       },
       cliente_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {model: "clientes", key:"id"},
         onUpdate: "CASCADE",
         onDelete: "CASCADE",
       },
       cep: {
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       logradouro:{
         type: Sequelize.STRING,
         allowNull: false,
       },
       numero:{
        type: Sequelize.INTEGER,
        allowNull: false,
       },
       bairro: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       cidade: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       uf: {
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
    
     await queryInterface.dropTable('enderecos');
   
  }
};

