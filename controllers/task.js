import ErrorHandler from "../middleware/error.js";
import Task from "../models/task.js"

export const getAllTasks = async(req,res,next) =>{
    const userid=req.user._id;
    try{
        let tasks = await Task.find({user:userid});
        res.status(200).json(tasks);
    }
    catch(err){
        next(err);
    }
}

export const getThatTask = async(req,res,next) =>{
    let {id} = req.params;
    try{
        let task = await Task.findById(id);
        res.status(200).json(task);
    }
    catch(err){
        next(err);
    }
}

export const addNewTask = async(req,res,next) =>{
    let {title,description} = req.body;
    try{
        await Task.create({title,description,user:req.user});
        res.status(201).json({message:"Task Added Successfully!"});
    }
    catch(err){
        next(err);
    }
}

export const updateTask = async(req,res,next) =>{
    try{
        let task = await Task.findById(req.params.id);
        if(!task){
            return next(new ErrorHandler("Invalid Id! task id not found! are you sure the task exists? did you make it up in your head?",404))
        }
        task.isCompleted = !task.isCompleted
        await task.save();

        res.status(200).json({message:"task updated!"});
    }
    catch(err){
        next(err);
    }
}

export const deleteTask = async(req,res,next) =>{
    try{
        let task = await Task.findById(req.params.id);
        if(!task){
            return next(new ErrorHandler("Invalid Id! task id not found! are you sure the task exists? did you make it up in your head?",404))
        }
        await task.deleteOne();

        res.status(200).json({success:true,message:"task removed!"});
    }
    catch(err){
        next(err);
    }

}
