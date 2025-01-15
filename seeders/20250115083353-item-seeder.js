'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', [
      {
        name: 'Shuttlecock',
        amount: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Racket',
        amount: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Badminton net',
        amount: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Basketball',
        amount: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  }
};
