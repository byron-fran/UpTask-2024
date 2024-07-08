import { transport } from "../config/nodemailer"

interface User {
    email : string,
    token : string,
    name : string
}

export class AuthEmail {

    public static emailConfirmation = async (user : User) => {

        await transport.sendMail({
            from : 'upTask',
            to : user.email,
            subject :    `Confirm your account`,
            text : 'Confirm your account',
            html : `
                <p>Hello ${user.name}, Activate your account</p>
                <a href="${process.env.URL_FRONTEND}/auth/confirm-account">Tap in this link</a>
                <p>Copy this code ${user.token} and paste </p>
            `
        })
    }
    public static newPassword = async (user : User) => {

        await transport.sendMail({
            from : 'upTask',
            to : user.email,
            subject :    `Reset your password`,
            text : 'Reset your password',
            html : `
                <p>Hello ${user.name}, Change your password</p>
                <a href="${process.env.URL_FRONTEND}/auth/new-password">Tap in this link</a>
                <p>Copy this code ${user.token} and paste </p>
            `
        })
    }
}