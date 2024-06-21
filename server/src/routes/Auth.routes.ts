import { Router } from "express";
import { AuthContoller } from "../controllers/Auth.controller";
import { body, param } from "express-validator";
import { handleInputErros } from "../middlewares/validators";
const router = Router();

router.post('/create-account',
    body('name').notEmpty().withMessage("name is required"),
    body('email').isEmail().withMessage('must be email'),
    body('password').isLength({ min: 8 }).withMessage("name is required"),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("password not match")
        }
        return true
    }),
    handleInputErros,
    AuthContoller.createAccount)

router.post('/token-confirmation',
    body('token').notEmpty().withMessage("token is required"),
    handleInputErros,
    AuthContoller.tokenConfirmation)
export default router