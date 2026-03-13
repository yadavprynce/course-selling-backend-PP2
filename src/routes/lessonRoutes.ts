import express from "express"
import { requireRole } from "../middlewares/roleMiddleware"
import { verifyToken } from "../middlewares/authMiddleware"
import { createLesson, getCourse } from "../controllers/lessonControllers"

export const lessonRouter = express.Router()

lessonRouter.post("/lessons", verifyToken ,requireRole("INSTRUCTOR") , createLesson)
lessonRouter.get("/courses/:courseId/lessons" , getCourse)