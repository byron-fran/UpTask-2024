import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface UserPayload {
    id: Types.ObjectId
}

export const generateJWT = (payload: UserPayload): string => {

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return token;

}