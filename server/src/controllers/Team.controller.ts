import { Request, Response } from 'express'
import User from '../models/User'
import Project from '../models/Project';

export class TeamMemberProject {

    public static findUser = async (req: Request, res: Response) => {
        const { email } = req.body

        try {
            const user = await User.findOne({ email }).select('_id email name')
            if (!user) {
                return res.status(404).json({ errors: 'user not found' })
            }
            return res.status(200).json(user)
        } catch (error: unknown) {
            return res.status(500).json({ errors: "error" })
        }
    };
    public static getMemberProject = async (req: Request, res: Response) => {
     
        try {
            const project = await Project.findById(req.project.id).populate({
                path : 'team',
                select : 'id email name'
            })
   
            return res.status(200).json(project.team);
            
        } catch (error: unknown) {
            return res.status(500).json({ errors: "error" })
        }
    };

    public static addMemberToTeam = async (req: Request, res: Response) => {
        const { id } = req.body
        try {

            const user = await User.findById(id).select('_id email name')
            if (!user) {
                return res.status(404).json({ errors: 'user not found' })
            };
            const userExist = req.project.team.some(t => t.toString() === user.id.toString());

            if (userExist) {
                return res.status(409).json({ errors: 'user already exist at the team' })
            }

            req.project.team.push(user.id);
            await req.project.save();

            return res.status(200).send("user added success");

        } catch (error: unknown) {
            return res.status(500).json({ errors: "error" })
        }
    };

    public static deleteMemberToTeam = async (req: Request, res: Response) => {

        const { id } = req.body
        try {

            if (!req.project.team.some(t => t.toString() === id)) {
                return res.status(409).json({ errors: 'user does not exists' })
            }

            req.project.team = req.project.team.filter(t => t.toString() !== id)
            await req.project.save();

            return res.status(200).send("user deleted success");

        } catch (error: unknown) {
            return res.status(500).json({ errors: "error" })
        }
    };
}