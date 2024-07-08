import { z } from 'zod'

// Auth 
const AuthSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
    password_confirmation : z.string()

})

export type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegitserForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    project: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt : z.string(),


});
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type task = z.infer<typeof taskSchema>;
export type taskFormData = Pick<task, 'description' | 'name'>


export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),


});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)
export type Project = z.infer<typeof projectSchema>

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>
