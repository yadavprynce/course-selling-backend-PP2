import type { NextFunction, Request, Response } from "express"
import { signUpSchema } from "../validators/signUpValidator"
import { prisma } from "../config/db"
import bcrypt from 'bcrypt'
import { globalErrorMiddleware } from "../middlewares/globalErrorMiddleware"
import { loginSchema } from "../validators/loginValidator"
import { generateToken } from "../utils/generateToken"
import { Env } from "../config/env"

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = signUpSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(409).json({
            message: "Invalid format"
        })
    }

    const { name, email, password, role } = parsedData.data
    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userExists) {
        return res.json({
            message: "Email already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        res.status(200).json({
            message: "User created successfully"
        })

    } catch (error: any) {
        next(error)

    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = loginSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid format"
        })
    }
    const { email, password } = parsedData.data

    const foundUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!foundUser) {
        return res.status(404).json({
            message: "Email bnit registered"
        })
    }

    const verifyPassword = bcrypt.compare(password, foundUser.password)

    if (!verifyPassword) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    try {
        const payload = {
            userId: foundUser.id,
            role: foundUser.role
        }

        const token = generateToken(payload, res)

        res.status(200).json({
            message:"You are logged in successfuly",
            token
        })
    } catch (error) {
        next(error)
    }
}