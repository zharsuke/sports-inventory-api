'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loans', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id'
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'userId'
      },
      itemId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'items',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'itemId'
      },
      amountLoan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'amountLoan'
      },
      status: {
        type: Sequelize.ENUM('pending', 'borrowed', 'returned'),
        allowNull: false,
        defaultValue: 'pending',
        field: 'status'
      },
      loanDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        field: 'loanDate'
      },
      returnDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        field: 'returnDate'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at'
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('loans');
  }
};