const express = require('express');
const app = express();
require("dotenv").config();
const { dbConnection } = require('./config/conn');
const { homerouter } = require('./routes/home.routes');
const { userrouter } = require('./routes/user.routes');
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
