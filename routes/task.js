import express from "express";
import { getAllTasks,addNewTask,updateTask,deleteTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter.get('/',(req,res)=>{
    res.send("concerning!!!")
})

taskRouter.post("/new",isAuthenticated,addNewTask);
taskRouter.get('/all',isAuthenticated,getAllTasks);
taskRouter.route('/taskid/:id',isAuthenticated)
.put(updateTask)
.delete(deleteTask);

export default taskRouter;