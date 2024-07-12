import api from "@/lib/axios"
import { Project, task, taskFormData, taskSchema } from "../types"
import { isAxiosError } from "axios"

type taskProps = {
    formData: taskFormData,
    id: task['_id'],
    projectId: Project['_id'],
    status: task['status']

};

export const createTask = async ({ formData, id }: Pick<taskProps, 'formData' | 'id'>) => {

    try {
        const { data } = await api.post(`/projects/${id}/tasks`, formData)

        return data
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
        
            throw new Error(error.response?.data.error)
        }

    }
};
export const getTaskById = async ({ projectId, id }: Pick<taskProps, 'projectId' | 'id'>) => {

    try {

        const { data } = await api.get<task>(`/projects/${projectId}/tasks/${id}`)
        const response = taskSchema.safeParse(data);
        return data
        // if (response.success) {
        //     return response.data
        // }
    }
    catch (error: unknown) {
        if (isAxiosError(error)) {
           
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
        
            throw new Error(error.response?.data.error)
        }
    }
}

export const deleteTaskById = async ({ id, projectId }: Pick<taskProps, 'id' | 'projectId'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${id}`;
        await api.delete(url)

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            throw new Error(error.response?.data.errors)
        }
    }
};

export const changeStatus = async ({ id, projectId, status }: Pick<taskProps, 'id' | 'projectId' | 'status'>) => {
    try {
        const url = `/projects/${projectId}/tasks/${id}/status`;
        const { data } = await api.post(url, { status })
        return data

    } catch (error: unknown) {
        if (isAxiosError(error)) {

            throw new Error(error.response?.data.error)
        }
    }
}