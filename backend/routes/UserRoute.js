import express from "express"
import { loginUser,registeredUser, removeUser,getAllUsers } from "../controllers/UserController.js"


const userRouter = express.Router()

userRouter.post("/register",registeredUser)
userRouter.post("/login",loginUser)
userRouter.post("/remove", removeUser);
userRouter.get("/list", getAllUsers);


export default userRouter;