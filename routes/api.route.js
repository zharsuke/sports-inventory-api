var express = require('express');
var router = express.Router();
const authController = require('../controllers/api/auth.controller');
const itemController = require('../controllers/api/item.controller');
const userController = require('../controllers/api/user.controller');
const loanController = require('../controllers/api/loan.controller');
const { verifyAdmin, verifyAccess } = require('./../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

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

// upload item file
router.post('/items/upload', verifyAdmin, upload, itemController.uploadFile);

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
// bulk store users
router.post('/users/bulkStore', verifyAdmin, userController.bulkStore);

// get all loans
router.get('/loans/', verifyAdmin, loanController.index);
// create new loan
router.post('/loans/', verifyAccess, loanController.store);
// get loan by id
router.get('/loans/:id', verifyAccess, loanController.show);
// update loan by id
router.put('/loans/:id', verifyAdmin, loanController.update);
// get loans by current user
router.get('/loan/currentUser', verifyAccess, loanController.getLoansByCurrentUser);

module.exports = router;