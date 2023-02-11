
const {User} = require("../Schema/user-schema");
const {UserFollow} = require("../Schema/follow")
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req,resp) => {

   const {name,username,email,password,_id} = req.body

   const user = await User.findOne({email:email})

   if(user){
     resp.send({message:"Sorry User Already Exist"})
     console.log(user)
   }
   else{    
        // Here I have Incrypt The Regular Password
        const hashedPassword = await bcrypt.hash(password,10)

        // Now What I am doing is To create a new User Object 
        const newUser = new User({
            name:name,
            username:username,
            email:email,
            password:hashedPassword,
            profile:{
                banner:"",
                dp:""
            }
        })

        newUser.save(err=>{
            if(err){
                resp.send(err)
            }else{
                const token = jwt.sign({email:email,id:_id},process.env.SECRET_KEY)
                resp.status(201).send({user:newUser,token:token,message:"Registered Successfully"})
            }
        })

   }

    
}

const login = async (req,resp) => {

    const {email,password} = req.body;
    const user =  await User.findOne({email:email});

    if(user){
        const matchedPassword = await bcrypt.compare(password,user.password)

        if(matchedPassword){
            const token = jwt.sign({email:email,id:user._id},process.env.SECRET_KEY)
            resp.status(201).json(
                {
                    loggeduser:user,
                    token:token,
                    message:"Login Successfully"
                }
                )
        }
        else{
            resp.send({message:"Invalid Password"})

        }
    }

    else{
        resp.send({message:"User Not Registered"})
    }

}

const UserData = async(req,resp) => {
    
    try {

        let user = await User.findOne({_id:req.params.id})
        resp.status(201).json(user)
    } catch (error) {
        resp.status(201).json({message:error})

    }
}


const LoggedUser = async (req,resp) => {

    try {

        let user = await User.findOne({_id:req.userId})
        resp.status(201).json(user)
    } catch (error) {
        resp.status(201).json({message:error})

    }

}

const UpdateProfilePic = async (req,resp) => {

    let file = req.file.originalname;
    let user = await User.findOne({_id:req.userId});


    let data = {
        ...user,
        profile:{
            dp:file,
            banner:""
        }
    }
    let newuser = new User(data)   
       

    try {
        
         await User.updateOne({_id:req.userId},{ $set:newuser})

        resp.status(201).json(newuser)
        
    } catch (error) {
        
    }




}

const GetLimitData = async (req,resp) => {

    let CurrentUser = req.userId

    //$ne will ignore selected item
    //limit will limit amout of data
   
    try {

        let user = await User.find({_id:{$ne:CurrentUser}}).limit(3);
        resp.status(201).json(user)
        
    } catch (error) {
        resp.status(201).json({message:error})

    }
}

const Follow = async (req,resp) => {

    let CurrentUser = req.userId;
    let UserToFollow = req.headers.userid;

    let newFollow = new UserFollow({
        followedBy:CurrentUser,
        following:UserToFollow
    })


    try {
          newFollow.save();
        resp.status(201).json({message:"Followed",})
    } catch (error) {
        resp.status(401).json({message:error})
    }
}

const UnFollow  = async (req,resp) => {

    let CurrentUser = req.userId;
    let UserToFollow = req.headers.userid;

    try {
        let deleteFollow = await UserFollow.deleteOne({followedBy:CurrentUser});
        resp.status(201).json({message:"Unfollow"})
    } catch (error) {
        resp.status(401).json({message:error})
    }


}

const GetFollowedUser = async(req,resp) => {

    let CurrentUser = req.userId;
    let UserToFollow = req.headers.userid;

    console.log(CurrentUser,UserToFollow)

    try {

        let result = await UserFollow.findOne({following:UserToFollow});
        let result2 = await UserFollow.findOne({followedBy:CurrentUser});

        if(result && result2){
            resp.status(201).json({followed:true,UserToFollow})
        }
        else{
            resp.status(201).json({followed:false,UserToFollow})

        }

        
    } catch (error) {
        resp.status(401).json({message:err})
    }

    
}

module.exports = {register,login,UserData,LoggedUser,UpdateProfilePic,
    GetLimitData,Follow,UnFollow,GetFollowedUser}