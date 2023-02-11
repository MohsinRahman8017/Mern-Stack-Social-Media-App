const mongoose = require("mongoose")

let Connection = (username,password) => {

    const URL = `mongodb+srv://${username}:${password}@cluster0.ky7x4fc.mongodb.net/?retryWrites=true&w=majority`;

    try {

        mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true})
        console.log("Data Base Connected Successfully")
        
    } catch (error) {
        console.log("error While Connecting With Data Base",error)

    }

}

module.exports = {Connection}