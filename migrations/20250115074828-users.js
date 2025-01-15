'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id',
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'username',
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        field: 'email',
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'password',
      },
      role: {
        type: Sequelize.ENUM('admin', 'borrower'),
        allowNull: false,
        defaultValue: 'borrower',
        field: 'role',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'createdAt',
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updatedAt',
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  }
};
