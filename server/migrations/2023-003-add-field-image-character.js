'use strict';

//** @type {import('sequelize-cli').Migration} */
//migration must return promise

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'characters', 
        'image_url',  
        {
          type: Sequelize.STRING,
          allowNull: true
        }),
      queryInterface.addColumn(
        'characters', 
        'powers',  
        {
          type: Sequelize.TEXT,
          allowNull: true
        }),
      queryInterface.addColumn(
        'characters', 
        'character_type',  
        {
          type: Sequelize.TEXT,
          allowNull: true
        }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('characters', 'image_url'),
      queryInterface.removeColumn('characters', 'powers'),
      queryInterface.removeColumn('characters', 'character_type'),
    ])
  }
};

//export default migration