const express = require('express');
const route = express.Router();

const userMiddleware = require('../middleware/userMiddleware');

const userController = require('../controllers/userController');

// kiem tra dang nhap
route.use(userMiddleware);
route.route('/getinfo').get(userController.getinfo);
route.route('/logout').get(userController.logout);

module.exports = route;
