const express = require("express");
const app = express();
const {Connection} = require("./dataBase/db")
const {userRouter} = require("./routes/userRoutes")
const {postRouter} = require("./routes/postRoutes")
const {postReaction} = require("./routes/postReaction")
const dotenv = require("dotenv").config()
const cors = require("cors")

app.use(cors())
app.use(express.json())
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
app.use(express.urlencoded({extended:true}))
app.use("/Files",express.static("Files"))


app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/reaction",postReaction)

Connection(username,password)

const PORT = 8600;


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})