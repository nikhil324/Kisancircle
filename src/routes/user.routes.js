const express = require('express');
const userrouter = express.Router();
const { registerController, loginController } = require('../controller/user.controller');

userrouter.route('/').get();
userrouter.route('/signup').post(registerController);
userrouter.route('/login').post(loginController);

module.exports = { userrouter };