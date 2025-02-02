const redis = require("redis");

const User = require("../models/user.schema");




const maintain_session_redis = async (req) => {
    const client = redis.createClient();
    await client.connect();
    client.on('error', err => console.log('Redis client error', err));
    try {

        const user = req.user;
        const isUser = await User.find({ email: user.email });
        console.log(isUser);
        if (isUser) {
            await client.SET(isUser[0].name, JSON.stringify({
                'user_id': isUser[0]._id,
                'status': true
            }));
            const session = await client.get(isUser[0].name);
            console.log(session);
        }
        else {
            console.log("User not found");
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { maintain_session_redis };