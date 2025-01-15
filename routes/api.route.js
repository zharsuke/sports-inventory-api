var expresss = require('express');
var router = expresss.Router();
const authController = require('../controllers/api/auth.controller');
const itemController = require('../controllers/api/item.controller');
const userController = require('../controllers/api/user.controller');
const { verifyAdmin, verifyAccess } = require('./../middleware/authMiddleware');

// login
router.post('/login/', authController.login);
// register
router.post('/register/', authController.register);

// get all items
router.get('/items/', verifyAccess, itemController.index);
// create new item
router.post('/items/', verifyAdmin, itemController.store);
// get item by id
router.get('/items/:id', verifyAccess, itemController.show);
// update item by id
router.put('/items/:id', verifyAdmin, itemController.update);
// delete item by id
router.delete('/items/:id', verifyAdmin, itemController.destroy);
// bulk store items
router.post('/items/bulkStore', verifyAdmin, itemController.bulkStore);

// get all users
router.get('/users/', verifyAdmin, userController.index);
// create new user
router.post('/users/', verifyAdmin, userController.store);
// get user by id
router.get('/users/:id', verifyAdmin, userController.show);
// update user by id
router.put('/users/:id', verifyAdmin, userController.update);
// delete user by id
router.delete('/users/:id', verifyAdmin, userController.destroy);

module.exports = router;