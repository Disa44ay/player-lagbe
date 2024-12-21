import express from "express"
import { loginUser,resgisteredUser } from "../controllers/UserController.js"


const userRouter = express.Router()

userRouter.post("/register",resgisteredUser)
userRouter.post("/login",loginUser)

export default userRouter;