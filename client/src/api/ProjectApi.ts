import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, ProjectFormData, Project } from "../types";

export async function createProject(info: ProjectFormData) {
    try {
        const { data } = await api.post('/projects/', info);

        return data
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
}


export async function getAllProjects() {
    try {
        const { data } = await api.get('/projects/');
        const res = dashboardProjectSchema.safeParse(data)
        return res
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
}

export async function getProjectById(id: string): Promise<Project | undefined> {
    try {
        const { data } = await api.get<Project>(`/projects/${id}`);

        return data
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
};

interface Props {
    id: Project['_id'],
    formData: ProjectFormData
}
export async function updateProject({ id, formData }: Props): Promise<Project | undefined> {
    try {
        const { data } = await api.put<Project>(`/projects/${id}`, formData);

        return data
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            console.log(error.response)
            throw new Error(error.response?.data.error)
        }

    }
}