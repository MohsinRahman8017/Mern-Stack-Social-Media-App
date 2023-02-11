const express = require("express");
const postRouter =  express.Router();
const {Upload} = require("../multer/multer")
const {Auth} = require("../middleware/auth")

const {SharePost,UserPost,GetSingleUserPost,DeletePost,GetAllData,} = require('../controller/postController')

postRouter.post("/sharepost",Auth,Upload,SharePost);
postRouter.get("/UserPost/:id",Auth,UserPost);
postRouter.get("/GetSingleUserPost",GetSingleUserPost);
postRouter.delete("/deletePost",Auth,DeletePost);
postRouter.get("/GetAllData",Auth,GetAllData);

module.exports = {postRouter}