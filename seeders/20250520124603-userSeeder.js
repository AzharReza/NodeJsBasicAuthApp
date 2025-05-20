'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'user1123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};