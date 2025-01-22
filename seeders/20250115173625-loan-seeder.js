'use strict';

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

    await queryInterface.bulkInsert('loans', [
      {
        userId: 1,
        itemId: 1,
        amountLoan: 1,
        status: 'pending',
        loanDate: new Date(),
        returnDate: new Date(),
      },
      {
        userId: 2,
        itemId: 2,
        amountLoan: 1,
        status: 'borrowed',
        loanDate: new Date(),
        returnDate: new Date(),
      },
      {
        userId: 3,
        itemId: 3,
        amountLoan: 1,
        status: 'returned',
        loanDate: new Date(),
        returnDate: new Date()
      },
      ...Array.from({ length: 50 }, (_, i) => ({
        userId: Math.floor(Math.random() * 10) + 1, // User ID between 1 and 10
        itemId: Math.floor(Math.random() * 10) + 1, // Item ID between 1 and 10
        amountLoan: Math.floor(Math.random() * 5) + 1, // Amount between 1 and 5
        status: 'pending',
        loanDate: new Date(),
        returnDate: new Date(),
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

    await queryInterface.bulkDelete('loans', null, {});
  }
};
