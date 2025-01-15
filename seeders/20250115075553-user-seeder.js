'use strict';

var bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', 8),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'borrower',
        email: 'borrower@gmail.com',
        password: bcrypt.hashSync('borrower', 8),
        role: 'borrower',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ...Array.from({ length: 50 }, (_, i) => ({
        username: `borrower${i + 1}`,
        email: `borrower${i + 1}@gmail.com`,
        password: bcrypt.hashSync(`borrower${i + 1}`, 8),
        role: 'borrower',
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {});
  }
};
