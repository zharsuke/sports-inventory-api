const { underscoredIf } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
    const loans = sequelize.define('loans', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id',
        },
        userId: {
            type: DataTypes.BIGINT,
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
            type: DataTypes.BIGINT,
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
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'amountLoan'
        },
        status: {
            type: DataTypes.ENUM('pending', 'borrowed', 'returned'),
            allowNull: false,
            defaultValue: 'pending',
            field: 'status'
        },
        loanDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'loanDate',
            defaultValue: DataTypes.NOW,
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'returnDate',
            defaultValue: null,
        },
    }, {
        tableName: 'loans',
        underscored: true,
    });

    loans.associate = function (models) {
        loans.belongsTo(models.users, { foreignKey: 'userId' });
        loans.belongsTo(models.items, { foreignKey: 'itemId' });
    };

    return loans;
}