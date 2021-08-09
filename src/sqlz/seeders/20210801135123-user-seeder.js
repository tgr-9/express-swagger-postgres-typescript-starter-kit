'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [{
        firstname: 'Jhon',
        lastname: 'Doe',
        email: 'example@gmail.com',
        password: (await import('bcrypt')).hashSync('1234',11),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};