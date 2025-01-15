const Validator = require('fastest-validator');
const { items } = require('./../../models/');
const v = new Validator();
var bcrypt = require('bcryptjs');

module.exports = {
    index: async (req, res) => {
        try {
            const response = await items.findAll({
                attributes: ['id', 'name', 'amount', 'createdAt', 'updatedAt']
            });
            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    store: async (req, res) => {
        try {
            const schema = {
                name: 'string',
                amount: 'number',
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json(validate);
            }

            await items.create({
                name: req.body.name,
                amount: req.body.amount,
            });

            return res.status(201).json({ message: 'Data was inserted!' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await items.findByPk(id, {
                attributes: ['id', 'name', 'amount', 'createdAt', 'updatedAt']
            });

            return res.status(200).json(response || {});
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            let data = await items.findByPk(id, {
                attributes: ['id', 'name', 'amount', 'createdAt', 'updatedAt']
            });

            if (!data) {
                return res.json({ message: 'Data not Found!' });
            }

            const schema = {
                name: 'string|optional',
                amount: 'number|optional',
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json(validate)
            }

            const response = await data.update({
                name: req.body.name,
                amount: req.body.amount,
            });

            return res.status(200).json(response);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    destroy: async (req, res) => {
        try {
            const id = req.params.id;

            let data = await items.findByPk(id);

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