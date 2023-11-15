'use strict';

//** @type {import('sequelize-cli').Migration} */
//migration must return promise

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'actors', 
        'image_url',  
        {
          type: Sequelize.STRING,
          allowNull: true
        }),
      queryInterface.removeColumn(
        'actors', 
        'global_box_office'  
      ),
      queryInterface.removeColumn(
        'actors', 
        'synopsis' 
      ),
    ]);
  },


  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('actors', 'image_url'),
      queryInterface.addColumn('actors', 'global_box_office'),
      queryInterface.addColumn('actors', 'synopsis'),
    ])
  }
};

//export default migration