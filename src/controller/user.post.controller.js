const { userCreatePost, userCreateComment } = require("../services/user.post.services");
const createPostController = async (req, res) => {
    try {
        const result = await userCreatePost(req);
        if (!result) {
            res.status(401).send("Error while creating post");
        }
        res.status(201).send({ Post: result });

    } catch (error) {
        res.status(500).send(error);

    }
}
const createCommentController = async (req, res) => {
    try {
        const result = await userCreateComment(req);
        if (!result) {
            res.status(401).send("Error while creating comment");
        }
        res.status(201).send({ Comment: result });

    } catch (error) {

    }

}

module.exports = {
    createPostController,
    createCommentController
};