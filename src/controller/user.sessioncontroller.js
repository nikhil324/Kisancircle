const { maintain_session_service } = require("../services/user.sessionservice");



const maintain_session_control = async (req) => {
    try {
        const result = await maintain_session_service(req);
        console.log("done");
    }
    catch (err) {
        // res.status(500).json({message: "Server Error", err});
        console.log("Server Error")
    }
}

module.exports = { maintain_session_control }   