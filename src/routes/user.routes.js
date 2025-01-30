const express = require('express');
const userrouter = express.Router();
const { registerController, loginController } = require('../controller/user.controller');

userrouter.route('/').get();
userrouter.route('/signup').post(registerController);
userrouter.route('/login').get(loginController);

module.exports = { userrouter };