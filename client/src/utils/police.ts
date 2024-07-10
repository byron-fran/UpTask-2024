import { User } from "../types";

export const isManager = (managerId : User['_id'], userId : User['_id']) : boolean => {
    return managerId === userId
}