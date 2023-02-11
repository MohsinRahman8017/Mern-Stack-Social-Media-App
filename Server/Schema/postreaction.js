const mongoose = require("mongoose");
Increment = require('mongoose-auto-increment');

const PostReaction = mongoose.Schema({
    postId:String,
    userId:String
})

Increment.initialize(mongoose.connection);
PostReaction.plugin(Increment.plugin,"love")

const PostLove = mongoose.model("love",PostReaction);

module.exports = {PostLove}