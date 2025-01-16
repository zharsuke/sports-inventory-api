module.exports = (sequelize, DataTypes) => {
    const logs = sequelize.define('logs', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id'
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'message'
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'level'
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'timestamp'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updatedAt'
        }
    }, {
        tableName: 'logs',
        underscored: true,
    });

    return logs;
};