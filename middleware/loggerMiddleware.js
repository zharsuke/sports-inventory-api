const fs = require('fs');
const path = require('path');
const { logs } = require('../models');

const logFilePath = path.join(__dirname, '../logs/loan_transactions.log');

const logToFile = (message) => {
    fs.appendFileSync(logFilePath, message + '\n', 'utf8');
};

const logToDatabase = async (message, level, timestamp) => {
    await logs.create({ message, level, timestamp });
};

const logger = {
    info: async (message) => {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} info: ${message}`;
        logToFile(logMessage);
        await logToDatabase(message, 'info', timestamp);
    },
    error: async (message) => {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} error: ${message}`;
        logToFile(logMessage);
        await logToDatabase(message, 'error', timestamp);
    }
};

module.exports = logger;