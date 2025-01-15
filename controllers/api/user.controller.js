const Validator = require('fastest-validator');
const { users } = require('./../../models/');
const v = new Validator();
var bcrypt = require('bcryptjs');

module.exports = {
    index: async (req, res) => {
        try {
            const response = await users.findAll({
                attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
            });
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    store: async (req, res) => {
        try {
            const schema = {
                username: 'string',
                email: 'email',
                password: 'string',
                role: 'string'
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json(validate);
            }

            await users.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.role
            });

            return res.status(201).json({ message: 'Data was inserted!' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await users.findByPk(id, {
                attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
            });

            return res.status(200).json(response || {});
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            let data = await users.findByPk(id, {
                attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
            });

            if (!data) {
                return res.json({ message: 'Data not Found!' });
            }

            const schema = {
                username: 'string|optional',
                email: 'email|optional',
                password: 'string|optional',
                role: 'string|optional'
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json(validate)
            }

            const response = await data.update({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: req.body.role
            });

            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    destroy: async (req, res) => {
        try {
            const id = req.params.id;

            let data = await users.findByPk(id);

            if (!data) {
                return res.json({ message: 'Data not Found!' });
            }

            await data.destroy(id);

            return res.status(200).json({ message: "Data was deleted!" });
        } catch (err) {
            return req.status(500).json({ message: err.message });
        }
    }
}