import type { NextFunction, Request, Response } from "express";

export const globalErrorMiddleware = ( error:Error , req:Request , res:Response , next:NextFunction ) => {
    console.error(error)

    res.status(400).json({
        error:"Invalid request",
        statusCode:400,
        timestamp: new Date().toISOString()
    })

}