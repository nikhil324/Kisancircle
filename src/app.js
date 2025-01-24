const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hi, This is KisanCircle portal");
})
app.listen(port, () => {
    console.log(`I am listening from the port ${port}`);
})
