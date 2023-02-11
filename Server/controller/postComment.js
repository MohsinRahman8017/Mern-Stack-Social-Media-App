
const {Comment} = require("../Schema/post-comment")
const {User} = require("../Schema/user-schema")

let AddPostComment = async (req, resp) => {  
   try {
    const data = req.body
    const userId = req.userId
    const postId = req.headers.postid

    const newComment  = new Comment({
      input:data.input,
      userId,
      postId

   })

    await newComment.save()
    resp.status(201).json({data:data.input, userId, postId})
    
   } catch (error) {
    resp.status(401).json(error)
   }
}

let GetPostComment = async (req,resp) => {

   try {
      const allComments =  await Comment.find({});
      const users =  await User.find({})

      const newComments = [];

      allComments.map((item,index)=>{
         newComments[index] = {
            id:item._id,
            input:item.input,
            postId:item.postId,
            userId:0,
            userData: users.find((u)=>{
               return item.userId == u._id
            })
         }
      })


       resp.status(201).json({comments:newComments})   
   } catch (error) {
      resp.status(401).json({message:error})
   }
}

module.exports = {AddPostComment,GetPostComment}
