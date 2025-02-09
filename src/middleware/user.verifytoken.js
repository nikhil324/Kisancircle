const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
// const key = process.env.secretKey;


const verify_token = async (req) => {
    var token = req.headers.authorization;
    if (token) {
        if (token.slice(0, 6) === "Bearer") {
            token = token.slice(7, token.length);
        }
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        return decoded;
    }
    else {
        return { error: "error" };
    }
}

module.exports = { verify_token }; 