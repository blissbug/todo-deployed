import express from "express";
import { register, getAllUsers, getUserDetail, login, logoutUser} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/logout',logoutUser);
userRouter.get('/getall',getAllUsers);
userRouter.get('/me',isAuthenticated,getUserDetail);

export default userRouter;