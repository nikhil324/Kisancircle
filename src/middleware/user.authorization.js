const jwt = require('jsonwebtoken');
require('dotenv').config();





const authorization = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decodedData = jwt.verify(token, process.env.SECRETKEY);
        const { email } = decodedData

        req.email = email; // Attach user data for later use
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }


};


module.exports = { authorization };