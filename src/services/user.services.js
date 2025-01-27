require('dotenv').config();
const User = require('../models/user.schema');
const bcrypt = require('bcrypt');
const registerUser = async (req) => {
    try {
        const data = req.body;
        const encryptpass = await bcrypt.hash(data.password, parseInt(process.env.SALT));
        data.password = encryptpass;
        const registerdata = new User(data);
        const result = await registerdata.save();
        console.log(result);
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
            if (!passmatch) {
                return false
            }
            else {
                return true;
            }
        }
    }
    catch (err) {
        return false;
    }
}
module.exports = { registerUser, userLogin };