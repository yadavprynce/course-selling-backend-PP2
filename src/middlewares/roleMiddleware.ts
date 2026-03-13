//this time we will be creating a higher order function which will be returning another function which 
//which will 

import type { NextFunction, Request, Response } from "express"

export const requireRole = (role: "STUDENT" | "INSTRUCTOR") => {
    return function requireRole (req:Request , res:Response , next:NextFunction){
        if(req.user.role !== role){
           return res.status(403).json({
            message : "Couldn't verify role"
           })
        }
        next();
    } 

}
