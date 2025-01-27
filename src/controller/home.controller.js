const express = require('express');
const { showHomePage } = require('../services/home.services');

const showHomePageController = async (req, res) => {
    try {
        const data = await showHomePage();
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
}
module.exports = showHomePageController;