import { Request, Response } from 'express'
import Project from '../models/Project';

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)

        try {

            await project.save();
            return res.status(200).json(project)
        } catch (error: unknown) {
            console.log(error)
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {

            const projects = await Project.find()

            return res.status(200).json(projects);

        } catch (error: unknown) {
            console.log(error)
        }
    };

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {

            const project = await Project.findById(id).populate('tasks')

            if (!project) {
                return res.status(404).json({ errors: "project not found" })
            }
            return res.status(200).json(project);

        } catch (error: unknown) {
            console.log(error)
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {

            const project = await Project.findByIdAndUpdate(id, req.body)

            if (!project) {
                return res.status(404).json({ errors: "project not found" })
            }
            return res.status(200).json(project);

        } catch (error: unknown) {
            console.log(error)
        }
    };

    static deleteProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {

            const project = await Project.findById(id)

            if (!project) {
                return res.status(404).json({ errors: "project not found" })
            }
            await project.deleteOne()
        
            return res.status(204).json({ message : "delete success"});

        } catch (error: unknown) {
            console.log(error)
        }
    };

}