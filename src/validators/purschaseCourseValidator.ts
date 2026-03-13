import {z} from 'zod'

export const createCourseSchema = z.object({
    courseId : z.number()
})