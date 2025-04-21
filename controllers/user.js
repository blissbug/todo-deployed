import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middleware/error.js"

export const getAllUsers = async(req,res,next)=>{
    try{
        let users = await User.find({});
        res.status(200).json(users);
    }
    catch(err){
        next(err);
    }
}

export const register = async(req,res,next)=>{
    try{
        const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user) return next(new ErrorHandler("User Already exists!",400));

    const hashedPass = await bcrypt.hash(password,8);

    user = await User.create({name,email,password:hashedPass});

    sendCookie(user,res,"User Created!",201);
    }
    catch(err){
        next(err);
    }
}

export const getUserById = async (req,res,next)=>{ 
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.json({
            success:true,
            user:user
        })
    }
    catch(err){
        next(err);
    }
};

export const login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
    let user = await User.findOne({email:email}).select("+password");

    if(!user) return next(new ErrorHandler("User doesnt exist!",400));


    let isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("invalid email or password!",400));

    sendCookie(user,res,"Logged In!",200);
    }
    catch(err){
        next(err)
    }
}

export const getUserDetail=(req,res)=>{
    
    return res.status(200).json({success:true,user:req.user});
}

export const logoutUser = (req,res,next)=>{
    try{
        res
    .status(200)
    .cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "development"? "lax":"none",
        secure:process.env.NODE_ENV === "development"? false:true,
    })
    .json({success:true, message:"logged out!"})

    }
    catch(err){
        next(err);
    }    
}