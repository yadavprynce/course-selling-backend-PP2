import express from "express"
import { verifyToken } from "../middlewares/authMiddleware"
import { requireRole } from "../middlewares/roleMiddleware"
import { getPurchases, purchaseCourse } from "../controllers/purchasesController"

export const purchaseRouter = express.Router()

purchaseRouter.post("/purchases" , verifyToken , requireRole("STUDENT") , purchaseCourse)
purchaseRouter.get("/users/:id/purchases" , verifyToken ,getPurchases)