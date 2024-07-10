import api from "@/lib/axios"
import { isAxiosError } from "axios"
import type { Project, TeamMember } from "../types"

interface findUserProps {

    projectId: Project['_id'],
    email: string
};

export const findUser = async ({ email, projectId }: findUserProps) => {
    
    try {

        const { data } = await api.post(`projects/${projectId}/user/find`, {email});
      
        return data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors)
        }
    }
};

export const addMemberToTeam = async ({ id, projectId }: {id : TeamMember['_id'], projectId : Project['_id']}) => {
    
    try {

        const { data } = await api.post(`projects/${projectId}/user`, {id});
      
        return data;

    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors)
        }
    }
}