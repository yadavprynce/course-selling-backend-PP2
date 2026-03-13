import {z} from "zod"

export const signUpSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string(),
    role:z.enum(["STUDENT" , "INSTRUCTOR"]).default("STUDENT").optional()
})