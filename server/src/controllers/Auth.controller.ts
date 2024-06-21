import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt';

export class AuthContoller {

    public static createAccount = async (req: Request, res: Response) => {
        const { email ,password} = req.body
        try {

            const emailExist = await User.findOne({ email });
            if (emailExist) {

                return res.status(409).json({ errors: "email already exists" });

            };

            const user = new User(req.body)
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt);
            
            await user.save();
            return res.status(200).json({ user })

        } catch (error: unknown) {
            return res.status(500).json({ errors: "Something wrong" })
        }
    }
}