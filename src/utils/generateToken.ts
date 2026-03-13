import jwt from "jsonwebtoken"
import { Env } from "../config/env"
import type { Response } from "express"

interface MyCustomPayload {
    userId: string,
    role: "STUDENT" | "INSTRUCTOR"
}


export const generateToken = (payload: MyCustomPayload, res: Response) => {

    const token = jwt.sign(payload, Env.JWT_SECRET, {
        expiresIn: "2h"
    })

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure:process.env.NODE_ENV === "production",
        maxAge: 120*60*1000  //   in millsecs  
    })

}