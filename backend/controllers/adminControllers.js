import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import AppError from "../utils/appError.js"
import Admin from "../models/adminModel.js"
import User from "../models/userModel.js"

export const verifyLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new AppError("invalid credentials", 401);
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
        throw new AppError("invalid credentials", 401)
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
    res.json({
        status: "success",
        message: "admin verified",
        token,
    })
})

export const getAllUsers= asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json({
        status:"success",
        users
    })
   
})

export const addNewUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body;
    email = email.toLowerCase()
    const isExistingEmail = await User.findOne({ email })
    if (isExistingEmail) {
        throw new AppError("email already used", 401)
    }
    const salt = await bcrypt.genSalt(10);
    // hashing password
    password = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password })
    res.json({
        status:"success",
        message:"new user added"
    })
})

export const editUser = asyncHandler(async(req,res)=>{
    const userId=req.params.id
    let {name,email}=req.body;
    email = email.toLowerCase();
    const isExistingEmail = await User.findOne({ email })
    const user = await User.findById(userId)
    if (isExistingEmail&&user.email!=email) {
        throw new AppError("existing email", 401)
    }
    await User.findByIdAndUpdate(userId, { $set: { name, email }});
    res.json({
        status:"success",
        message:"user details modified"
    })
})

export const deleteUser = asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    await User.findByIdAndDelete(userId)
    res.json({
        status:"success",
        message:"user deleted"
    })
})