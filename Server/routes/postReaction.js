const express = require("express");
const postReaction =  express.Router();
const {Auth} = require("../middleware/auth");



const {PostActionLove,GetPostLove,DeletePostLove,} = require('../controller/postReactionController');
const {AddPostComment,GetPostComment} = require('../controller/postComment');

// Post Love 
postReaction.post("/PostLove",Auth,PostActionLove);
postReaction.get("/GetPostLove",Auth,GetPostLove);
postReaction.delete("/DeletePostLove",Auth,DeletePostLove);

// Post Comment 

postReaction.post("/AddPostComment",Auth,AddPostComment);
postReaction.get("/GetPostComment",GetPostComment)

module.exports = {postReaction}