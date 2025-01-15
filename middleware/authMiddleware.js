const jwt = require('jsonwebtoken');
const { users } = require('../models');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided.' });
        }

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err.message);
                return res.status(403).json({ message: 'Invalid token.' });
            }

            req.userId = decoded.id;

            const user = await users.findByPk(decoded.id);

            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied, admin only.' });
            }

            next();
        });
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({
            message: 'Invalid token.',
            error: err.message
        });
    }
};

const verifyAccess = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided.' });
        }

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error('Token verification error:', err.message);
                return res.status(403).json({ message: 'Invalid token.' });
            }

            req.userId = decoded.id;

            next();
        });
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(401).json({
            message: 'Invalid token.',
            error: err.message
        });
    }
};

module.exports = { verifyAdmin, verifyAccess };