const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNSTRING);
        console.log('connected to database');
    }
    catch (error) {
        console.error(`error to connect mongodb ${error}`);
    };
}
module.exports = { dbConnection };
