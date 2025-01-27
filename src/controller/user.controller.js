const { registerUser, userLogin } = require('../services/user.services');

const registerController = async (req, res) => {
    try {
        const result = await registerUser(req);
        if (!result) {
            res.status(406).send("Data values are not valid");
        }
        else {
            res.status(201).send(result);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}
const loginController = async (req, res) => {
    try {
        const result = await userLogin(req);
        if (!result) {
            res.status(406).send({
                Login: result
            });
        }
        else {
            res.status(201).send({
                Login: result
            });
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { registerController, loginController };