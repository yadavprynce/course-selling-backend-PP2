import {z} from "zod"

export const createCourseSchema = z.object({
    title:z.string(),
    description:z.string(),
    price:z.number(),
})
