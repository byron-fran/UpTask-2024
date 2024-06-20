import api from "@/lib/axios"
import { Project, task, taskFormData } from "../types"
import { isAxiosError } from "axios"

type taskProps = {
    formData: taskFormData,
    id: task['_id'],
    projectId: Project['_id'],

};
export const createTask = async ({ formData, id }: Pick<taskProps, 'formData' | 'id'>) => {

    try {
        const { data } = await api.post(`/projects/${id}/tasks`, formData)

        return data
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
};
export const getTaskById = async ({ projectId, id }: Pick<taskProps, 'projectId' | 'id'>) => {

    try {
        const { data } = await api.get(`/projects/${projectId}/tasks/${id}`)

        return data
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
};

export const updateTaskById = async ({ formData, id, projectId }: Pick<taskProps, 'formData' | 'id' | 'projectId'>) => {

    try {

        const url = `/projects/${projectId}/tasks/${id}`;
        const { data } = await api.put(url, formData);
        return data

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }
    }
}
