const multer = require("multer");

const Upload = multer ( {
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"Files")
        },
        filename:function(req,file,cb){
            cb(null,file.originalname)
        }
    })
}).single("file")

module.exports = {Upload}