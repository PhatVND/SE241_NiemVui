const express = require('express');
const route = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const userController = require('../controllers/userController');

// kiem tra dang nhap
route.use(authMiddleware);

// với user bình thường
route.route('/getinfo').get(userController.getinfo);
route.route('/logout').get(userController.logout);

// với admin
route.use(adminMiddleware);
route.route('/add/user').post(userController.addUser);


module.exports = route;
