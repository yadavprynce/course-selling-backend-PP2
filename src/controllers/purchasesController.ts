import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";

export const purchaseCourse = async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.body as string;
    const userId = req.user.userId as string;

    const alreadyPurchased = await prisma.purchase.findFirst({
        where: {
            courseId: courseId,
            userId: userId
        }
    })

    if (alreadyPurchased) {
        res.status(400).json({
            message: "You already have this course , please refer to you courses"
        })
    }


    const createPurchase = await prisma.$transaction(async (tx) => {
        try {
            await tx.purchase.create({
                data: {
                    userId: userId,
                    courseId: courseId
                }
            })

            res.status(201).json({
                message:"Purchase successful",
                Details:createPurchase
            })
        }catch(error){
            next(error)
        }
    })
}



export const getPurchases = async(req:Request , res:Response , next:NextFunction) =>{
    const userId = req.params.id as string;

    try{
        const purchases = await prisma.purchase.findMany({
            where:{
                userId:userId
            }
        })

        if(purchases.length == 0){
           return res.status(200).json({message:"No courses Purchased",
            purchases:[]
           })
        }

        res.status(200).json({
            purchases
        })

    }catch(error){
        next(error)
    }
}