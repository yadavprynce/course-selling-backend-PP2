import type { NextFunction, Request, Response } from "express";
import { createCourseSchema } from "../validators/createCourseValidator";
import { prisma } from "../config/db";

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = createCourseSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            messsage: "Invalid format"
        })
    }

    const { title, description, price } = parsedData.data

    try {

        const course = await prisma.course.create({
            data: {
                title,
                description,
                price,
                instructorId: req.user.userId
            }
        })

        res.status(201).json({
            message: "Course created successfully",
            course
        })

    } catch (error) {
        next(error)
    }


}

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {

    const courseId = req.params.id as string;

    try {
        const courseWithLessons = await prisma.course.findUnique({
            where: {
                id: courseId
            }, include: {
                lessons: true
            }
        })

        if (!courseWithLessons) {
            return res.status(404).json({
                message: "No course found with this courseId"
            })
        }

        res.status(200).json({
            courseId:courseId,
            courseTitle: courseWithLessons.title,
            description: courseWithLessons.description,
            lessons: courseWithLessons.lessons.map((less) => ({
                id: less.id,
                title: less.title
            }))
        })
    } catch (error) {
        next(error)
    }
}

export const modifyCourse = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const { title, description, price } = req.body

    try {
        const updateCourse = await prisma.course.update({
            where: {
                id: id as string
            }, data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(price && { price })
            }
        })

        res.status(200).json(updateCourse)

    } catch (error) {
        next(error)

    }

}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    try {
        await prisma.course.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: `Course with id ${id} is deleted successfully`
        })

    } catch (error) {
        next(error)
    }

}