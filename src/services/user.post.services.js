const Post = require("../models/user.post.schema");
const Comment = require("../models/user.comment.schema");

const userCreatePost = async (req) => {

    try {
        // console.log("user create post");

        const fromUserId = req.user.user_id;
        // console.log(fromUserId);

        const { image, crop, description, sellatrupee, duration } = req.body;
        //duration can be 3-7 days

        if (duration < 3 || duration > 7) {
            return res.status(400).json({ error: "Sell duration must be between 3 to 7 days." });
        }


        const selltill = new Date();
        selltill.setDate(selltill.getDate() + duration);



        const newPost = new Post({
            fromUserId,
            image,
            crop,
            description,
            sellatrupee,
            selltill
        });
        await newPost.save();
        return { success: true, message: "Post created successfully", newPost };
    } catch (error) {
        return { success: false, message: "Failed to create post" };
    }
};

const userCreateComment = async (req) => {
    try {
        const userId = req.user.user_id;
        const postId = req.params.postId;
        const { bidAmount } = req.body;
        console.log(userId, postId, bidAmount);

        const newComment = new Comment({
            userId,
            postId,
            bidAmount
        });
        await newComment.save();
        return { success: true, message: "Comment created successfully", newComment };

    } catch (error) {
        return { success: false, message: "Failed to create comment" };

    }

}

module.exports = {
    userCreatePost, userCreateComment
};