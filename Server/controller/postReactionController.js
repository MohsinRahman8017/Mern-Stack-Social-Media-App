const { Post} = require("../Schema/post-schema")
const {User} = require("../Schema/user-schema")
const {PostLove} =  require("../Schema/postreaction")

let PostActionLove = async (req,resp) => {

    let postId = req.headers.postid
    let userId = req.userId

    let likecreate = await PostLove.findOne({postId:postId,userId:userId})

    let postLove = {
                    postId:postId,
                    userId:userId       
                    }

    const newpost = new PostLove(postLove)

    await newpost.save()
    resp.status(201).json(newpost)
    
            
}

let GetPostLove = async (req,resp) => {
    
    try {        
        let likePost = await PostLove.find({});
        resp.status(201).json(likePost)
    } catch (error) {
        resp.status(401).json({message:"Some thing went wrong"})
    }

}

let DeletePostLove = async (req,resp) => {
    try {

         await PostLove.deleteOne({postId:req.headers.id, userId:req.userId});

        resp.status(201).json({message:"Action Perform Successfully"})
        
    } catch (error) {
        resp.status(401).json({message:"Something went Wrong"})
    }
}



module.exports = {PostActionLove,GetPostLove,DeletePostLove} 