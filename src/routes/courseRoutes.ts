import express from "express"
import { requireRole } from "../middlewares/roleMiddleware"
import { verifyToken } from "../middlewares/authMiddleware"
import { createCourse, deleteCourse, getCourses, modifyCourse } from "../controllers/courseControllers"

const courseRouter = express.Router()

courseRouter.post("/courses", verifyToken, requireRole("INSTRUCTOR"), createCourse)
courseRouter.get("/courses/:id", getCourses)
courseRouter.patch("/courses/:id", verifyToken, requireRole("INSTRUCTOR"), modifyCourse)
courseRouter.delete("/courses/:id" , verifyToken , requireRole("INSTRUCTOR") , deleteCourse)