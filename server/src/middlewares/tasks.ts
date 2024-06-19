import type { NextFunction, Request, Response } from 'express'
import Task, { TasksInterface } from '../models/Tasks';

declare global {
    namespace Express {
        interface Request {
            task: TasksInterface
        }
    }
}
export const TaskExists = async (req: Request, res: Response, next: NextFunction) => {
    const { taskId: id } = req.params;
    try {
        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).json({ errors: "task not found" })
        }
        req.task = task
        next()
    } catch (error: unknown) {
        return res.status(500).json({ errors: "someting wrong" })
    }

};

export const TasksBelongToProject = async (req: Request, res: Response, next: NextFunction) => {

    try {

        if (req.task.project.toString() !== req.project.id.toString()) {
            return res.status(400).json({ errors: "Task no valid" })
        }
        next()
    } catch (error: unknown) {
        return res.status(500).json({ errors: "someting wrong" })
    }

};