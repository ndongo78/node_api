'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull:false
      },
      categoryId:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      image: {
        type: DataTypes.STRING,
        allowNull:false
      },
      avis:{
         type:DataTypes.INTEGER,
         allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('articles');
  }
};