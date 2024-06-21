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
                <a href="#">Tap in this link</a>
                <p>Copy this code ${user.token} and paste </p>
            `
        })
    }
}