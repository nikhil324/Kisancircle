const express = require('express');
const app = express();
require("dotenv").config();
const { dbConnection } = require('./src/config/conn');
const { homerouter } = require('./src/routes/home.routes');
const { userrouter } = require('./src/routes/user.routes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = process.env.PORT;
app.use(express.json());



app.use('/', homerouter);
app.use('/', userrouter);
dbConnection().then(() => {
    console.log("data base connection established");
    app.listen(port, () => {
        console.log(`listing on port  ${port}`);
    })

}).catch(() => {
    console.error("Database connection failed", err);
});
