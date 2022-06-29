const express = require('express');
const { logoutControllers } = require('../controllers'); 
const verifyToken = require('../middlewares/jwt.middleware');
const router = express.Router();

router.get('/', verifyToken, logoutControllers.logout);

module.exports = router;