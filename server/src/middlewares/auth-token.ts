import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import User, { UserInterface } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({ errors: "unauthorizated" })
    };
    try {
        const token = bearer.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('_id email name')
            if (user) {
                req.user = user
                next()
            }
            else {
                return res.status(500).json({errors : "token invalidate"})
            }
        }

    } catch (error: unknown) {
        return res.status(500).json({errors : error})
    }
}