const { underscoredIf } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
    const items = sequelize.define('items', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id',
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'name',
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: 'amount',
        },
        filePath: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'filePath'
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
        tableName: 'items',
        underscored: true,
    });

    items.associate = function (models) {
        items.hasMany(models.loans, { foreignKey: 'itemId' });
    };

    return items;
}