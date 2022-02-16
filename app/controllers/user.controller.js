const express = require('express');
const {validationResult} = require('express-validator');

const router= express.Router();

const User= require('../models/user.model');
const upload = require('../utils/fileUpload');
const validateUser = require("../utils/validateUser");


const getAllUsers= async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page

        const users = await User.find().skip(skip).limit(per_page);

        if(!users) return res.status(400).json({msg: "No users found"}) 
        // return res.status(200).json(users);
        return res.render("users",{users: users})
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getUser = async (req,res)=>{
    try{
        
        const user = await User.findOne({_id: req.params.user_id});

        if(!user) return res.status(400).json({msg: "No users found"}) 
        // return res.status(200).json(users);
        return res.render("single_user",{user: user})
        // res.redirect("/users")
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const getUserByCode = async (req,res)=>{
    try{
        const user = await User.findOne({username: req.params.username});
        if(!user) return res.status(400).json({msg: "User not found"})        
        res.status(200).json(user);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const createUser = async (req,res)=>{
    try{
        console.log(req.file);
        // * Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        // * Create User
        const doesUserExist= await User.findOne({username: req.body.username})
        if(doesUserExist) return res.status(400).json({msg: "Duplicate user found"})
        const user = await User.create({
            username: req.body.username,
            email: req.body.email
        })

        if(!user) return res.status(400).json({msg: "User not created"})

        //200 ok
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const deleteUser =  async (req,res)=>{
    try{
        const user = await User.findOneAndDelete({ _id: req.params.user_id })
        if(!user) return res.status(404).json({msg: "User not found"})
        res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

const patchUser = async (req,res)=>{
    try{
        if(!req.body.username) return res.status(400).json({msg: "UserName is required"});
        const user = await User.findOneAndUpdate({ 
            _id: req.params.user_id 
        },{
            $set: {
                username: req.body.username,
                email: req.body.email
            }
        },{
            returnOriginal: false
        }
            )
        if(!user) return res.status(404).json({msg: "User not found"})
        res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    getUserByCode,
    createUser,
    deleteUser,
    patchUser
};