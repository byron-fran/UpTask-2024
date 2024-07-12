import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { NoteFormData, Project, task } from "../types";

type NoteType = {
    formData : NoteFormData,
    projectId : Project['_id'],
    taskId : task['_id']
}

export const createNote = async ( {formData,projectId, taskId} : Pick<NoteType, 'formData' | 'projectId' | 'taskId'>) => {

    try {

        const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/notes`, formData);
        
        return data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors)
        }
    }
}; 
