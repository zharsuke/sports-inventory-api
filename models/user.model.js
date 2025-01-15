const { underscoredIf } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id',
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'username',
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: 'email',
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'password',
        },
        role: {
            type: DataTypes.ENUM('admin', 'borrower'),
            allowNull: false,
            defaultValue: 'borrower',
            field: 'role',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createdAt',
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updatedAt',
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'users',
        underscored: true,
    });

    return users;
}