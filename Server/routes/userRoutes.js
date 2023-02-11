const express = require("express")

const userRouter = express.Router()
const {Auth} = require("../middleware/auth")
const {Upload} = require("../multer/multer")

const {register,login,UserData,LoggedUser,UpdateProfilePic,GetLimitData,Follow,UnFollow,GetFollowedUser} = require("../controller/userController")

userRouter.post("/register",register);
userRouter.post("/login",login)
userRouter.get("/userData/:id",Auth,UserData)
userRouter.get("/LoggedUser",Auth,LoggedUser)
userRouter.put("/updateProfilePic",Auth,Upload,UpdateProfilePic);
userRouter.get("/GetLimitData",Auth,GetLimitData)

// Follow UnFollow

userRouter.post("/followUser",Auth,Follow);
userRouter.delete("/unfollowUser",Auth,UnFollow);
userRouter.get("/getFollowedUser",Auth,GetFollowedUser )


module.exports = {userRouter}