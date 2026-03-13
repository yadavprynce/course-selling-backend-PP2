import jwt from "jsonwebtoken"
import type { NextFunction, Request, Response } from "express";
import { Env } from "../config/env";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }else if(req.cookies.jwt){
        token = req.cookies.jwt
    }

    if(!token){
        return res.status(401).json({
            message:"No token provided"
        })
    }
    
   const decoded = jwt.verify(token , Env.JWT_SECRET)
   req.user = decoded

   next();

}