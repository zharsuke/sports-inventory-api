var expresss = require('express');
var router = expresss.Router();
const authController = require('../controllers/api/auth.controller');
const itemController = require('../controllers/api/item.controller');

// AUTH METHOD : POST
router.post('/login/', authController.login);

module.exports = router;