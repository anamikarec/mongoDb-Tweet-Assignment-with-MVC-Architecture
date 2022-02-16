
const app=require("express")();
const mongoose  = require("mongoose");

//Schema
const tweetSchema= new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    tags : {type: Array, required: true}
   })

//Models
const Tweet= mongoose.model("Tweet",tweetSchema);

module.exports=Tweet;