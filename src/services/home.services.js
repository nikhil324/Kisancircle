const express = require('express');
const showHomePage = async () => {
    try {
        return "Hi WELCOME, This is home page for KisanCircle";
    }
    catch (error) {
        res.send(error);
    }
}
module.exports = { showHomePage }