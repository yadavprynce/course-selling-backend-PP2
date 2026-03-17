import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";

export const purchaseCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.body
    const userId = req.user.userId as string;

    try {
        const alreadyPurchased = await prisma.purchase.findFirst({
            where: {
                courseId: courseId,
                userId: userId
            }
        })

        if (alreadyPurchased) {
            return res.status(400).json({
                message: "You already have this course , please refer to you courses"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error or DB failure"
        })
    }


    try {
        const purchase = await prisma.$transaction(async (tx) => {

            await tx.purchase.create({
                data: {
                    userId: userId,
                    courseId: courseId
                }
            })
        })

        res.status(201).json({
            message: "Purchase successful",
            Details: purchase
        })

    } catch (error) {
        next(error)
    }
}



export const getPurchases = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params

    try {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId: userId
            }
        })

        if (purchases.length == 0) {
            return res.status(200).json({
                message: "No courses Purchased",
                purchases: []
            })
        }

        res.status(200).json({
            purchases
        })

    } catch (error) {
        next(error)
    }
}