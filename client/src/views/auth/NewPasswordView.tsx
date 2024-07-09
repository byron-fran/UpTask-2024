import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"

const NewPasswordView = () => {

    const [isValidToken, setIsValidToken] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    return (
        <>
            {!isValidToken ?
                <NewPasswordToken
                    token={token}
                    setIsValidToken={setIsValidToken}
                    setToken={setToken} /> :
                <NewPasswordForm token={token} />}
        </>
    )
}

export default NewPasswordView
