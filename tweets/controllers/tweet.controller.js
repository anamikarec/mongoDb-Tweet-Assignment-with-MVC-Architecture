const express = require('express');
const {validationResult} = require('express-validator');

const router= express.Router();

const Tweet= require('../models/tweet.model');
const upload = require('../utils/fileUpload');
const validateTweet = require("../utils/validateTweet");


const getAllTweets= async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        const tweets = await Tweet.find().skip(skip).limit(per_page);

        if(!tweets) return res.status(400).json({msg: "No Tweets found"}) 
        // return res.status(200).json(tweets);
        return res.render("tweets",{tweets : tweets})
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getTweet = async (req,res)=>{
    try{
        
        const tweets = await Tweet.findOne({_id: req.params.user_id});

        if(!tweets) return res.status(400).json({msg: "No tweets found"}) 
        return res.status(200).json(tweets);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getTweetByTitle = async (req,res)=>{
    try{
        const tweets = await Tweet.findOne({title: req.params.title});
        if(!tweets) return res.status(400).json({msg: "Tweet not found"})        
        res.status(200).json(tweets);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const createTweet = async (req,res)=>{
    try{
        console.log(req.file);
        // * Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const doesTweetExist= await Tweet.findOne({title: req.body.title})
        if(doesTweetExist) return res.status(400).json({msg: "Duplicate Tweet found"})
        const tweets = await Tweet.create({
            title : req.body.title,
            description : req.body.description,
            tags: req.body.tags
        })

        if(!tweets) return res.status(400).json({msg: "Tweet not created"})

        //200 ok
        return res.status(200).json(tweets)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const deleteTweet =  async (req,res)=>{
    try{
        const tweets = await Tweet.findOneAndDelete({ _id: req.params.user_id })
        if(!tweets) return res.status(404).json({msg: "tweets not found"})
        res.status(200).json(tweets)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const patchTweet = async (req,res)=>{
    try{
        if(!req.body.title) return res.status(400).json({msg: "title is required"});
        const tweets = await Tweet.findOneAndUpdate({ 
            _id: req.params.user_id 
        },{
            $set: {
               title: req.body.title,
               description: req.body.description,
               tags: req.body.tags
            }
        },{
            returnOriginal: false
        }
            )
        if(!tweets) return res.status(404).json({msg: "tweets not found"})
        res.status(200).json(tweets)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

module.exports = {
    getAllTweets,
    getTweetByTitle,
    getTweet,
    createTweet,
    deleteTweet,
    patchTweet
};