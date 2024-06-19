import {NextFunction, Request,Response} from 'express'
import { validationResult} from 'express-validator';

export const handleInputErros =  (req : Request, res : Response, next : NextFunction) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errrors : errors.array() })
    }
    next()
}