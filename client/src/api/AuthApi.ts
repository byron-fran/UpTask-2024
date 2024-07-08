import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { RequestConfirmationCodeForm, UserLoginForm, UserRegitserForm } from "../types";

export const createAccount = async (formData : UserRegitserForm) => {
    try {
        const {data} = await api.post('/auth/create-account', formData)

        return data
    } catch (error  : unknown) {
        if (isAxiosError(error)){
    
            throw new Error(error.response?.data.errors)
        }
    }
}
export const login = async (formData : UserLoginForm) => {
    try {
        const {data} = await api.post('/auth/login', formData)
        return data;
        
    } catch (error  : unknown) {
        if (isAxiosError(error)){
    
            throw new Error(error.response?.data.errors)
        }
    }
}
export const confirmAccount= async (token : string) => {
    try {
        const {data} = await api.post('/auth/token-confirmation',{token})
   
        return data
    } catch (error  : unknown) {
        if (isAxiosError(error)){
            console.log(error.response)
            throw new Error(error.response?.data.errors)
        }
    }
}

export const newRquestCode= async (email : RequestConfirmationCodeForm) => {
   
    try {
        const {data} = await api.post('/auth/request-code',{email : email['email']})

        return data
    } catch (error  : unknown) {
        if (isAxiosError(error)){
            console.log(error.response)
            throw new Error(error.response?.data.errors)
        }
    }
}