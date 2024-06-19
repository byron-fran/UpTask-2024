import type  {NextFunction, Request,Response} from 'express'
import Project, { ProjectInterface } from '../models/Project';

declare global {
    namespace Express {
        interface Request {
            project : ProjectInterface
        }
    }
}
export const ProjectExists = async (req : Request, res : Response, next : NextFunction) => {
    const {projectId : id } = req.params;
    try {
        const project = await Project.findById(id)

        if (!project) {
            return res.status(404).json({ errors: "project not found" })
        }
        req.project = project
        next()
    } catch (error : unknown) {
        return res.status(500).json({errors : "someting wrong"})
    }
  
}