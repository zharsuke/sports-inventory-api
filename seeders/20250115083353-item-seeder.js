'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('items', [
      {
        name: 'Shuttlecock',
        amount: 100,
        filePath: 'storage/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Racket',
        amount: 200,
        filePath: 'storage/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Badminton net',
        amount: 150,
        filePath: 'storage/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Basketball',
        amount: 250,
        filePath: 'storage/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ...Array.from({ length: 50 }, (_, i) => ({
        name: `Item ${i + 1}`,
        amount: Math.floor(Math.random() * 300) + 50, // Amount between 50 and 350
        filePath: 'storage/image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  }
};
