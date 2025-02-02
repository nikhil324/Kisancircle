require('dotenv').config();
const User = require('../models/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verify_token } = require("../middleware/user.verifytoken");
const { maintain_session_control } = require("../controller/user.sessioncontroller");

const registerUser = async (req) => {
    try {
        const data = req.body;
        const encryptpass = await bcrypt.hash(data.password, parseInt(process.env.SALT));
        data.password = encryptpass;
        const registerdata = new User(data);
        const token = jwt.sign({ email: data.email, user_id: data._id, name: data.name }, process.env.SECRETKEY, { expiresIn: "1d" });
        console.log(token);
        await maintain_session_control(req);
        const result = await registerdata.save();
        return result;
    }
    catch (error) {
        return false;
    }
}


const userLogin = async (req) => {
    try {
        const logdata = req.body;
        const email = logdata.email;
        const user = await User.findOne({ email });
        if (!user) {
            return false;
        }
        else {
            const passmatch = await bcrypt.compare(logdata.password, user.password);
            console.log(passmatch);
            if (!passmatch) {
                return false
            }
            else {
                const token = jwt.sign({ email: user.email, user_id: user._id, name: user.name }, process.env.SECRETKEY, { expiresIn: "1d" });
                console.log(token);
                await maintain_session_control(req);
                return true;
            }
        }
    }
    catch (err) {
        return false;
    }
}
module.exports = { registerUser, userLogin };