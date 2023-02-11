const jwt = require("jsonwebtoken")

let Auth = (req,resp,next) => {
   
    try {
        let token = req.headers.authorization
        if(token){

            let loggedUser = jwt.verify(token,process.env.SECRET_KEY);
            req.userId = loggedUser.id
        }
        else{
            resp.status(401).json({message:"Unathorized User"})
        }
        
        next()
        
    } catch (error) {
             resp.status(401).json({message:"Unathorized User"})

    }
}

module.exports = {Auth}