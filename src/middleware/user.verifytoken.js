const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const key = process.env.secretKey;


const verify_token = async (req) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, key);
        return decoded;
    }
    else {
        return { error: "error" };
    }
}

module.exports = { verify_token }; 