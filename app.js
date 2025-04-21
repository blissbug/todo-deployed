import express from "express"
import mongoose from "mongoose"
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import {errMiddleware} from "./middleware/error.js"
import { config } from "dotenv";
import cors from "cors";

config({
    path:"./data/config.env",
})

const app = express();

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI,{
        dbName:"todo",
    }).then(()=>{
        console.log("mongodb connected successfully")
    })
    .catch((err)=>{
        console.log("mongodb fucked up, try again!",err);
    })
}

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL, "http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

app.use("/api/v1/task",taskRouter);
app.use("/api/v1/user",userRouter);

//middleware for error handling
app.use(errMiddleware)

export default app;