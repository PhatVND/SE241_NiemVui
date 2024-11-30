const express = require('express');
const route = express.Router();

const userController = require('../controllers/userController');

route.route('/').post(userController.login);
route.route('/token').post(userController.refreshToken);
route.route('/logout').get(userController.logout);
route.route('/getInfo').get(userController.getinfo)


module.exports = route;
