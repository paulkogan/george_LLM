'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      character_id: {
        type: Sequelize.UUID, 
        allowNull: false
      },
      movie_id: {
        type: Sequelize.UUID, 
        allowNull: false
      },
      actor_id: {
        type: Sequelize.UUID, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      release_year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      global_box_office: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

    await queryInterface.createTable('actors', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      first_name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING, 
        allowNull: true
      },
      global_box_office: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      })
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.dropTable('actors'),
      await queryInterface.dropTable('movies'),
      await queryInterface.dropTable('roles')
    ]);
  }
};

//export default migration