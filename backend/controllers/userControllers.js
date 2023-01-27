import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js"
import cloudinary from "../utils/cloudinary.js"
import path from 'path'

export const verifyLogin =asyncHandler( async(req, res) => {
  const {email,password}=req.body
  const user=await User.findOne({email})
  if(!user){
   throw new AppError("User not found",401)
  } 
  const isPasswordCorrect=await bcrypt.compare(password,user.password)
  if(!isPasswordCorrect){
    throw new AppError("Sorry, passwrd not correct",401)
  }
  const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.json({
    status:"success",
    message:"verified user",
    data:{
      userId:user._id,
      name:user.name,
    },
    token
  })
})

export const register = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
  email = email.toLowerCase()
  const isExistingEmail=await User.findOne({email})
  if(isExistingEmail){
   throw new AppError("existing email",401)
  }
  const salt = await bcrypt.genSalt(10);
  // hashing password
  password = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password })
  const userId=user._id;
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.json({
    status:"success",
    data:{
      userId,
      name:user.name,
    },
    token
  })
})

export const setProfilePicture =asyncHandler(async(req,res)=>{
  const userId = req.params.id
  if(!req.file){
    throw new AppError("please upload your image before submit")
  }
  const {url}= await cloudinary.uploader.upload(req.file.path)
  await User.findByIdAndUpdate(userId,{$set:{picture:url}})
  res.json({
    status:"success",
    message:"profile picture updated",
  })
})

export const getUser = asyncHandler(async(req,res)=>{
  const {userId}=req
  const userData=await User.findById(userId)
  res.json({
    status:"success",
    userData
  })
})





