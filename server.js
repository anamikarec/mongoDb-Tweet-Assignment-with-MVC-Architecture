
const express=require("express");
const app =express();
const cors= require('cors');
const connect = require('./app/config/db');

const userRoute = require("./app/routes/user.route");

const PORT=5000;
app.set("view engine", "ejs")

app.use(cors());
app.use(express.json())

app.use("/users",userRoute);

app.get("/",(req,res,next)=>{
    res.render("index",{title: "Anamika"})
})

const start= async ()=>{
    await connect();
    app.listen(PORT,()=>{
        console.log(`app is listening on port ${PORT}`);
    })
}

module.exports=start;