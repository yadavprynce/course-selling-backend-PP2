import { connectDB } from "./config/db";
import { globalErrorMiddleware } from "./middlewares/globalErrorMiddleware";
import express from "express"
import { authRouter } from "./routes/authRoutes";
import { courseRouter } from "./routes/courseRoutes";
import { lessonRouter } from "./routes/lessonRoutes";
import { purchaseRouter } from "./routes/purchaseRoutes";
import cookieParser from "cookie-parser"


connectDB()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(globalErrorMiddleware)

app.use("/" , authRouter)

app.use("/" , authRouter)
app.use("/" , courseRouter)
app.use("/" , lessonRouter)
app.use("/" , purchaseRouter)


