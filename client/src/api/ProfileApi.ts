import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UserProfileForm } from "../types";

export const updateProfile = async (formData : UserProfileForm) => {
  
    try {
        
        const {data} = await api.put<string>('/auth/profile', formData)
        return data;

    } catch (error  : unknown) {    
        if (isAxiosError(error)){
            
            throw new Error(error.response?.data.errors)
        }
    }
}