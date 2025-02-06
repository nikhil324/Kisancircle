const express = require('express');
const userrouter = express.Router();
const { registerController,
    loginController,
    profileController,
    profilePassUpdateController,
    profileUpdateController,
    logoutController } = require('../controller/user.controller');
const { authorization } = require('../middleware/user.authorization');

userrouter.route('/').get();
userrouter.route('/signup').post(registerController);
userrouter.route('/login').post(loginController);
userrouter.route('/logout').post(authorization, logoutController);
userrouter.route('/profile/view').get(authorization, profileController);
userrouter.route('/profile/updatePassword').patch(authorization, profilePassUpdateController);
userrouter.route('/profile/updateProfile').patch(authorization, profileUpdateController);



module.exports = { userrouter };