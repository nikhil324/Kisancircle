const express = require('express');
const postrouter = express.Router();
const { validate_session_redis } = require("../middleware/user.sessionredis");
const { createPostController, createCommentController } = require('../controller/user.post.controller');

postrouter.route('/createpost').post(validate_session_redis, createPostController);
postrouter.route('/createcomment/:postId').post(validate_session_redis, createCommentController);

module.exports = { postrouter };