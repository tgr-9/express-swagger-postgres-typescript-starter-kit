'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('post', [{
        content: 'Hi.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Hi.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('post', null, {});
  }
};