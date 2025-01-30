const express = require('express');
const homerouter = express.Router();
const showHomePageController = require('../controller/home.controller');


homerouter.route("/").get(showHomePageController);

module.exports = { homerouter };