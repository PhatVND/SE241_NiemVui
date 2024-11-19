const express = require('express');
const route = express.Router();

const userController = require('../controllers/userController');

route.route('/').post(userController.login);
route.route('/token').post(userController.refreshToken);

module.exports = route;
