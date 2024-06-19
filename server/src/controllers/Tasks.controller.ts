import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Tasks";


export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {

            const task = new Task({ ...req.body, project: req.project.id })
            req.project.tasks.push(task.id);
            await Promise.allSettled([req.project.save(), task.save()])

            return res.status(200).json(task);

        } catch (error: unknown) {
            console.log(error)
        }
    };

    static getTaskByProject = async (req: Request, res: Response) => {

        try {

            const tasks = await Task.find({ project: req.project.id }).populate('project')
            return res.status(200).json(tasks);

        } catch (error: unknown) {
            console.log(error)
        }
    };
    static getTaskById = async (req: Request, res: Response) => {

        try {
            const task = await Task.findById(req.task.id)

            if (task.project.toString() !== req.project.id) {
                return res.status(400).json({ errors: "Task no valid" })
            }
            return res.status(200).json(task);
        } catch (error: unknown) {
            console.log(error)
        }

    };

    public static upateTask = async (req: Request, res: Response) => {

        try {
            const task = await Task.findById(req.task.id)

            if (task.project.toString() !== req.project.id) {
                return res.status(400).json({ errors: "Task no valid" })
            }
            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            return res.status(200).json(task);

        } catch (error: unknown) {
            console.log(error)

        }

    };

    static deleteTaskById = async (req: Request, res: Response) => {

        try {
            const task = await Task.findById(req.task.id)


            req.project.tasks = req.project.tasks.filter(task => task._id.toString() !== req.task.id)
            await Promise.allSettled([task.deleteOne(), req.project.save()])
            return res.status(204).json({});

        } catch (error: unknown) {
            console.log(error)
        }
    };
    static updateTaskStatus = async (req: Request, res: Response) => {

        const { status } = req.body;
        try {

            req.task.status = status
            await req.task.save()

            return res.status(200).json(req.task);

        } catch (error: unknown) {
            console.log(error)
        }
    };
}