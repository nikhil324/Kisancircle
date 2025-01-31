const express = require('exprss');
const app = express();
require("dotenv").config();
const { dbConnection } = require('./config/conn');
const { homerouter } = require('./routes/home.routes');
const { userrouter } = require('./routes/user.routes');
const port = process.env.PORT;
app.use(express.json());
dbConnection();

app.use('/', homerouter);
app.use('/', userrouter);
app.listen(port, () => {
    console.log(`I am listening from the port ${port}`);
})
