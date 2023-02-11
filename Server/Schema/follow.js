const mongoose = require("mongoose");
Increment = require('mongoose-auto-increment');

const Follow = mongoose.Schema({
   followedBy:{
      type:"String",
      ref:"User"
   },
   following:{
      type:"String",
      ref:"User"
   }
})

Increment.initialize(mongoose.connection);
Follow.plugin(Increment.plugin,"follow")

const UserFollow = mongoose.model("follow",Follow);

module.exports = {UserFollow}
