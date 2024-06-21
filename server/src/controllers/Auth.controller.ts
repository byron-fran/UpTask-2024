import { Request, Response } from 'express'
import User from '../models/User';
import Token from '../models/Token';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import { transport } from '../config/nodemailer';
import { AuthEmail } from '../emails/AuthEmail';

export class AuthContoller {

    public static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {

            const emailExist = await User.findOne({ email });
            if (emailExist) {

                return res.status(409).json({ errors: "email already exists" });

            };

            const user = new User(req.body)
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt);


            const token = new Token()
            token.token = generateToken()
            token.user = user.id;

            AuthEmail.emailConfirmation
            ({ 
                email: user.email, 
                token: token.token, 
                name: user.name 
            });

            await Promise.allSettled([user.save(), token.save()])
            return res.status(200).json({ user })

        } catch (error: unknown) {
            return res.status(500).json({ error })
        }
    }
}