require('dotenv').config();
const User = require('../models/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { verify_token } = require("../middleware/user.verifytoken");
const { maintain_session_control } = require("../controller/user.sessioncontroller");


const registerUser = async (req) => {
    try {
        const data = req.body;

        const encryptpass = await bcrypt.hash(data.password, parseInt(process.env.SALT));
        data.password = encryptpass;
        const registerdata = new User(data);
        console.log(registerdata);

        const token = jwt.sign({ email: data.email, user_id: data._id, name: data.name }, process.env.SECRETKEY, { expiresIn: "1d" });

        await maintain_session_control(req);
        const result = await registerdata.save();
        result.token = token;

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
            return { success: false };
        }

        const passmatch = await bcrypt.compare(logdata.password, user.password);
        if (!passmatch) {
            return { success: false };
        }
        const token = jwt.sign(
            { email: user.email, user_id: user._id, name: user.name },
            process.env.SECRETKEY,
            { expiresIn: "1d" }
        );




        // console.log(token);
        await maintain_session_control(req);

        // Return success and token
        return { success: true, token };
    } catch (err) {
        return { success: false };
    }
};

const userLogout = async (req) => {
    try {

        const email = req.email;

        if (!email) {
            return { success: false, message: "User already logged out" };
        }

        return { success: true, email };

    } catch (error) {
        console.error("Error while logging out:", error);
        return { success: false, message: "Internal Server Error" };
    }
};





const userProfile = async (req) => {
    try {
        if (!req.email) {
            return { success: false, message: "Email is required" };
        }

        const user = await User.findOne({ email: req.email });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        return { success: true, user };

    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { success: false, message: "Internal server error" };
    }
};
const userProfilePassUpdate = async (req) => {
    try {

        if (!req.email) {
            return { success: false, message: "Email is required" };
        }
        const user = await User.findOne({ email: req.email });
        console.log(user);

        const { password, newPassword } = req.body;

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return { success: false, message: "user current password is incorrect" };
        } else {
            const password = await bcrypt.hash(newPassword, parseInt(process.env.SALT));
            user.password = password;
        }
        await user.save();
        return { success: true, message: "user password has been changed " };
    } catch (error) {
        console.error("Error updating user profile:", error);

    }
}
const userProfilePUpdate = async (req) => {
    try {
        if (!req.email) {
            return { success: false, message: "Email is required" };
        }
        const user = await User.findOne({ email: req.email });
        Object.keys(req.body).forEach(key => { user[key] = req.body[key] });
        await user.save();
        return { success: true, message: "user prfile updated successfully" };

    } catch (error) {
        console.error("Error updating user profile:", error);
        return { success: false, message: "user prfile  not updated successfully" };


    }



}

module.exports = {
    registerUser, userLogin, userLogout,
    userProfile, userProfilePassUpdate, userProfilePUpdate
};