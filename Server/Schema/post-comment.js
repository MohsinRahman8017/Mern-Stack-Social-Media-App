const mongoose = require("mongoose");
Increment = require('mongoose-auto-increment');

const PostComment = mongoose.Schema({
     input:String,
     userId:String,
     postId:String

})

Increment.initialize(mongoose.connection);
PostComment.plugin(Increment.plugin,"comment")

const Comment = mongoose.model("comment",PostComment);

module.exports = {Comment}
