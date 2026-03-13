import express from "express"
import { login, register } from "../controllers/authController"

export const authRouter = express.Router()

authRouter.post("/auth/signup" , register )
authRouter.post("/auth/login" , login )

