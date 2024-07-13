import { Router } from "express";
import { AuthContoller } from "../controllers/Auth.controller";
import { body, param } from "express-validator";
import { handleInputErros } from "../middlewares/validators";
import { authenticate } from "../middlewares/auth-token";

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
    AuthContoller.tokenConfirmation);

router.post('/login',
    body('email').notEmpty().withMessage('email is required'),
    body('password').notEmpty().withMessage("password is required"),
    handleInputErros,
    AuthContoller.login);

router.post('/request-code',
    body('email').notEmpty().withMessage('email is required'),
    handleInputErros,
    AuthContoller.requestCode);

router.post('/forgot-password',
    body('email').notEmpty().withMessage('email is required'),
    handleInputErros,
    AuthContoller.forgotPassword);

router.post('/token-password',
    body('token').notEmpty().withMessage("token is required"),
    handleInputErros,
    AuthContoller.tokenPasswordConfirmation);

router.post('/new-password/:token',
    param('token').notEmpty().withMessage("token is required"),
    handleInputErros,
    AuthContoller.changeNewPassword);

router.get('/user-profile', authenticate, AuthContoller.getUser)

// Profile routes
router.put('/profile',
    authenticate,
    body('name').notEmpty().withMessage("name is required"),
    body('email').isEmail().withMessage('must be email'),
    handleInputErros,
    AuthContoller.updateProfile)


router.post('/update-password',
    authenticate,
    body('current_password').isLength({ min: 8 }).withMessage("password is required"),
    body('password').isLength({ min: 8 }).withMessage("password is required"),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("password not match")
        }
        return true
    }),
    handleInputErros,
    AuthContoller.updatePassword)

router.post('/check-password',
        authenticate,
        body('password').isLength({ min: 8 }).withMessage("password is required"),  
        handleInputErros,
        AuthContoller.checkPassword)
export default router