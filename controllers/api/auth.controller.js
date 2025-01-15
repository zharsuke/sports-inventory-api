const Validator = require('fastest-validator');
const { users } = require('../../models');
const v = new Validator();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
    JWT_EXPIRATION,
    JWT_SECRET
} = process.env;

module.exports = {
    login: async (req, res) => {
        try {

            const { email, password } = req.body;

            const schema = {
                email: 'email',
                password: 'string'
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json({
                    status: 'error',
                    message: validate
                });
            }

            const user = await users.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid user or password'
                });
            }

            const isValidPassword = await bcrypt.compareSync(password, user.password);

            if (!isValidPassword || !user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Invalid user or password'
                });
            }

            let accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION
            });

            return res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: accessToken
            })
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}