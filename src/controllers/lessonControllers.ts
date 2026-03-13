import type { NextFunction, Request, Response } from "express";
import { createLessonSchema } from "../validators/createLessonValidator";
import { prisma } from "../config/db";

export const createLesson = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = createLessonSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid format"
        })
    }

    const { title, courseId, content } = parsedData.data


    try {
        const lessons = await prisma.lesson.create({
            data: {
                title,
                content,
                courseId
            }
        })

        res.status(201).json({
            lessons
        })
    } catch (error) {
        next(error)
    }

}

export const getCourse = async (req: Request, res: Response, next: NextFunction) => {

    const courseId = req.params.courseId as string;

    try {
        const getCourse = await prisma.course.findUnique({
            where: {
                id: courseId
            }, include: {
                lessons: true
            }
        })

        if (!getCourse) {
            return res.status(404).json({
                message: "No course found"
            })
        }

        res.status(200).json(getCourse.lessons.map((less) => ({
            id: less.id,
            title: less.title
        })))

    } catch (error) {
        next(error)
    }
}