import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ProjectFormData } from "types";

export async function createProject (info : ProjectFormData) {
    try {
        const {data} = await api.post('/projects/', info);
       
        return data
    } catch (error : unknown) {
        if (isAxiosError(error)){
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }
      
    }
}