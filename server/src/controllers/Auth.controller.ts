import { Request, Response } from 'express'
import User from '../models/User';
import Token from '../models/Token';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';
import { checkPassword } from '../utils/check-password';
import { generateJWT } from '../utils/jwt';

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
            return res.status(200).send("Account created success, check your email")

        } catch (error: unknown) {
            return res.status(500).json({ error })
        }
    };

    public static tokenConfirmation = async (req: Request, res: Response) => {
        const { token } = req.body
        try {

            const tokenExists = await Token.findOne({ token });
            
            if (!tokenExists) {
                const error = new Error("token invalidate")
                return res.status(401).json({ errors: error.message })
            };
            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            return res.status(200).send("account created successfully")

        } catch (error: unknown) {
            return res.status(500).json({ error })
        }
    };

    public static login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ errors: "email not found" })
            };
            if (!user.confirmed) {

                const token = new Token()
                token.token = generateToken()
                token.user = user.id;

                AuthEmail.emailConfirmation
                    ({
                        email: user.email,
                        token: token.token,
                        name: user.name
                    });
                await Promise.allSettled([token.save()])
                return res.status(401).json({ errors: "Your account is not confirmed, check your email for a new token" })
            };

            // check password
            const isPasswordCorrect = await checkPassword(password, user.password);
            if (!isPasswordCorrect) {

                return res.status(401).json({ errors: "Password incorrect" });
            };
            const token = generateJWT({id : user.id})
            return res.status(200).send(token)
        }
        catch (error: unknown) {
            return res.status(500).json({ error })
        }
    };

    public static requestCode = async (req: Request, res: Response) => {
        const { email } = req.body
        try {

            const user = await User.findOne({ email });
            if (!user) {

                return res.status(404).json({ errors: "email does not exists" });

            };

            if (user.confirmed) {

                return res.status(404).json({ errors: "user already confirmed" });
            }

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
            return res.status(200).send("new token created, check your email")

        } catch (error: unknown) {
            return res.status(500).json({ error })
        }
    };

    public static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body
        try {

            const user = await User.findOne({ email });
            if (!user) {

                return res.status(404).json({ errors: "email does not exists" });

            };

       
            const token = new Token()
            token.token = generateToken()
            token.user = user.id;

            await token.save();
            AuthEmail.newPassword
                ({
                    email: user.email,
                    token: token.token,
                    name: user.name
                });

            
            return res.status(200).send("new token created, check your email")

        } catch (error: unknown) {
            return res.status(500).json({ error })
        }
    };


    public static tokenPasswordConfirmation = async (req: Request, res: Response) => {
        const { token } = req.body;
    
        try {

            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("token invalidate")
                return res.status(401).json({ errors: error.message })
            };
         

            return res.status(200).send("now, create new password")

        } catch (error: unknown) {
            return res.status(500).json({ error })
        }
    };

    public static changeNewPassword = async (req: Request, res: Response) => {
        const {token} = req.params;
        console.log({token})
        try {
            const tokenExists = await Token.findOne({ token });
            
            if (!tokenExists) {
                const error = new Error("token invalidate")
                return res.status(401).json({ errors: error.message })
            };
            const user = await User.findById(tokenExists.user)
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt);

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            return res.status(200).send("change password success")
            
        } catch (error: unknown) {
            return res.status(500).json({ errors : error })
        }  
        

    };
    public static getUser = async (req: Request, res: Response) => {
        return res.status(200).json(req.user)
    }

    public static updateProfile = async (req: Request, res: Response) => {
        const {email, name} = req.body

        try {
            const userExists = await User.findOne({email})
            if(userExists && userExists.id.toString() !== req.user.id.toString()){
                return res.status(409).json({errors : "User already exists"})
            }
            req.user.email = email
            req.user.name = name
            await req.user.save()
            return res.status(200).send('Update profile success')
            
        } catch (error : unknown) {
            return res.status(500).json({ errors : error })
        }
    };
}