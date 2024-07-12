import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, task } from "../types";

type NoteType = {
    formData: NoteFormData,
    projectId: Project['_id'],
    taskId: task['_id'],
    noteId: Note['_id']
}

export const createNote = async ({ formData, projectId, taskId }: Pick<NoteType, 'formData' | 'projectId' | 'taskId'>) => {

    try {

        const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/notes`, formData);

        return data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors)
        }
    }
};

export const deleteNoteById = async ({ projectId, taskId, noteId }: Pick<NoteType, | 'projectId' | 'taskId' | 'noteId'>) => {

    try {

        await api.delete(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`);

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors)
        }
    }
};

