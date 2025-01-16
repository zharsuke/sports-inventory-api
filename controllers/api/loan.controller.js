const Validator = require('fastest-validator');
const { loans, users, items } = require('./../../models/');
const v = new Validator();
const logger = require('../../middleware/loggerMiddleware');

module.exports = {
    index: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const response = await loans.findAll({
                limit: limit,
                offset: offset,
                attributes: ['id', 'itemId', 'userId', 'amountLoan', 'status', 'loanDate', 'returnDate'],
                include: [
                    {
                        model: users,
                        attributes: ['id', 'username', 'email']
                    },
                    {
                        model: items,
                        attributes: ['id', 'name']
                    }
                ]
            });

            await logger.info(`Loans retrieved: ${JSON.stringify(response)}`);
            return res.status(200).json(response);
        } catch (err) {
            await logger.error(`Loan retrieval failed: ${err.message}`);
            return res.status(500).json({ message: err.message });
        }
    },
    store: async (req, res) => {
        try {
            const schema = {
                itemId: 'number',
                amountLoan: 'number',
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json(validate);
            }

            // Find the item
            const item = await items.findByPk(req.body.itemId);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            // Check if there is enough amount to loan
            if (item.amount < req.body.amountLoan) {
                return res.status(400).json({ message: 'Not enough items in stock' });
            }

            // Create the loan
            const loan = await loans.create({
                itemId: req.body.itemId,
                userId: req.userId, // Set userId to the logged-in user
                amountLoan: req.body.amountLoan,
                status: 'pending',
                loanDate: new Date(),
                returnDate: null
            });

            // Decrement the item amount
            item.amount -= req.body.amountLoan;
            await item.save();

            await logger.info(`Loan created: ${JSON.stringify(loan)}`);
            return res.status(201).json({ message: 'Data was inserted!' });
        } catch (err) {
            await logger.error(`Loan creation failed: ${err.message}`);
            return res.status(500).json({ message: err.message });
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await loans.findByPk(id, {
                attributes: ['id', 'itemId', 'userId', 'amountLoan', 'status', 'loanDate', 'returnDate'],
                include: [
                    {
                        model: users,
                        attributes: ['id', 'username', 'email']
                    },
                    {
                        model: items,
                        attributes: ['id', 'name']
                    }
                ]
            });

            await logger.info(`Loan retrieved: ${JSON.stringify(response)}`);
            return res.status(200).json(response || {});
        } catch (err) {
            await logger.error(`Loan retrieval failed: ${err.message}`);
            return res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const schema = {
                status: { type: 'enum', values: ['pending', 'borrowed', 'returned'] }
            }

            const validate = v.validate(req.body, schema);

            if (validate.length) {
                return res.status(400).json(validate);
            }

            const loan = await loans.update({
                status: req.body.status
            }, {
                where: {
                    id: id
                }
            });

            await logger.info(`Loan updated: ${JSON.stringify(loan)}`);
            return res.status(200).json({ message: 'Data was updated!' });
        } catch (err) {
            await logger.error(`Loan update failed: ${err.message}`);
            return res.status(500).json({ message: err.message });
        }
    }
}