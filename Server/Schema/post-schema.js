const mongoose = require("mongoose");
Increment = require('mongoose-auto-increment');

const PostSchema = mongoose.Schema({
     Input:String,
     file:String,
     LoggedUserId:String,
     type:String,
     LikedValue:String
})

Increment.initialize(mongoose.connection);
PostSchema.plugin(Increment.plugin,"post")

const Post = mongoose.model("post",PostSchema);

module.exports = {Post}

