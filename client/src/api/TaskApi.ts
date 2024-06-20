import api from "@/lib/axios"
import { task, taskFormData } from "../types"
import { isAxiosError } from "axios"

type taskProps = {
    formData : taskFormData,
    id : task['_id']
};
export const createTask = async ({formData, id} : Pick<taskProps, 'formData' | 'id'>) => {

    try {
        const {data}  = await api.post(`/projects/${id}/tasks`,formData )
        
        return data
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
}