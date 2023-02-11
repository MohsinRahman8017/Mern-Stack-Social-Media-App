
const { Post} = require("../Schema/post-schema")
const {User} = require("../Schema/user-schema")
const {PostLove} =  require("../Schema/postreaction")

const express = require("express")
const { plugin } = require("mongoose")


const SharePost = async(req,resp) => {

    try {
         
        const PostData = {
            Input : req.body.Input,
            file:req.file.originalname,
            type:req.body.type,
            LoggedUserId:req.userId
        } 

        console.log(PostData)
    
        const NewPost = new Post(PostData)

        try {
          await NewPost.save();
            resp.status(201).json({post:NewPost,message:"Post Created Successfully"})
        } catch (error) {
            resp.status(404).json({message:"Something Went Wrong"})
        }
    
        
    } catch (error) {
        resp.status(404).json({message:error.message})

    }


}

const UserPost =  async(req,resp) => {

    console.log(req.params.id)
    try {

        const UserPost  = await Post.find({LoggedUserId:req.params.id});
        resp.status(201).json(UserPost)

    } catch (error) {
        resp.status(201).json({message:error})

    }
}

let GetSingleUserPost = async (req,resp) => {

    try {
        
        const UserPost  = await Post.findOne({_id:req.headers.id});
        const Users= await User.findOne({_id:UserPost.LoggedUserId});

        let newPost = {
            _id:UserPost.id,
            Input:UserPost.Input,
            file:UserPost.file,
            type:UserPost.type,
            LoggedUserId:Users
             
        }

        resp.status(201).json(newPost)

    } catch (error) {
        resp.status(201).json({message:error})

    }
}

let DeletePost = async (req,resp) => {
    
    let userId = req.userId
    let PostId =  req.headers.id;
    
    const post =  await Post.findOne({LoggedUserPost:userId});

    if(post){
         await Post.deleteOne({_id:PostId});
        resp.status(201).json({message:"Post Deleted Successfully"})
    }
    else{
        resp.status(201).json({message:"SomeThing Went Wrong"})

    }
}


let GetAllData = async(req,resp) => {

    try {

        const posts = await Post.find({});
        const users = await User.find({});
        const PostLiked = await PostLove.find({userId:req.userId})

        const newPost = [];
        
        posts.forEach((p,i)=>{
            newPost[i] = {
                _id:p.id,
                Input:p.Input,
                file:p.file,
                type:p.type,
                LoggedUserId: users.find(u => u.id == p.LoggedUserId),
                liked: PostLiked.find((l,i)=>{
                    return p.id == l.postId  
                })
              }
            })        

        resp.status(201).json({post:newPost})
        
    } catch (error) {
        
    }
   

}



module.exports = {SharePost,UserPost,GetSingleUserPost,DeletePost,GetAllData}