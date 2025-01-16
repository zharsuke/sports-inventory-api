const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const { logs } = require('../models');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/loan_transactions.log' }),
        new transports.Stream({
            stream: {
                write: async (message) => {
                    const [timestamp, level, ...msgParts] = message.split(' ');
                    const msg = msgParts.join(' ');
                    await logs.create({ message: msg.trim(), level, timestamp: new Date(timestamp) });
                }
            }
        })
    ]
});

module.exports = logger;