import { connectDB } from "./config/db";
import { globalErrorMiddleware } from "./middlewares/globalErrorMiddleware";
import express from "express"
import { authRouter } from "./routes/authRoutes";


connectDB()
const app = express()

app.use(globalErrorMiddleware)

app.use("/" , authRouter)



console.log("hiii")


