import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema,ProjectFormData } from "../types";

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


export async function getAllProjects () {
    try {
        const {data} = await api.get('/projects/');
        const res = dashboardProjectSchema.safeParse(data)
        return res
    } catch (error : unknown) {
        if (isAxiosError(error)){
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }
      
    }
}