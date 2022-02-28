

const express= require('express');
const { createPost, deletePost, getPost, patchPost } = require('../controller/post.controller');
const router = express.Router();

const authenticated = require("../middlewares/authenticated");
const authorization = require('../middlewares/authorization');
const { author} = require('../utils/constants');

router.post("/", authenticated, createPost);
router.get("/", authenticated, getPost);
router.delete("/:post_id", authenticated, authorization([author]),deletePost);
router.patch("/:post_id", authenticated, authorization([author]),patchPost);


module.exports = router;