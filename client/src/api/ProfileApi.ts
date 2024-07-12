import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UpdatePasswordProfileForm, UserProfileForm } from "../types";

export const updateProfile = async (formData : UserProfileForm) => {
  
    try {
        
        const {data} = await api.put<string>('/auth/profile', formData)
        return data;

    } catch (error  : unknown) {    
        if (isAxiosError(error)){
            
            throw new Error(error.response?.data.errors)
        }
    }
};

export const updatePassword = async (formData : UpdatePasswordProfileForm) => {

    try {
        
        const {data} = await api.post<string>('/auth/update-password', formData)
        return data;

    } catch (error  : unknown) {    
        if (isAxiosError(error)){
            
            throw new Error(error.response?.data.errors)
        }
    }
};

export const checkPassword = async (password : string) => {

    try {
        
        const {data} = await api.post<string>('/auth/check-password',{ password})
        return data;

    } catch (error  : unknown) {    
        if (isAxiosError(error)){
            
            throw new Error(error.response?.data.errors)
        }
    }
};