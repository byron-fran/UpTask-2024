import { object,  z } from 'zod'

// Auth 
const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    current_password : z.string()

})

export type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegitserForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdatePasswordProfileForm = Pick<Auth, 'password' | 'current_password' | 'password_confirmation'>

export const userSchema = AuthSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'email' | 'name'>
// Notes Types
const NoteSchema = z.object({
    _id : z.string(),
    content : z.string(),
    createdBy : userSchema,
    task : z.string(),
    createdAt : z.string()
})
export type Note = z.infer<typeof NoteSchema>
export type NoteFormData = Pick<Note, 'content'>


export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    project: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(object({
        _id : z.string(),
        user : userSchema,
        status : taskStatusSchema
    })),
    notes : z.array(NoteSchema.extend({ createdBy : userSchema})),
    createdAt: z.string(),
    updatedAt: z.string(), 

    

});

export type TaskStatus = z.infer<typeof taskStatusSchema>
export type task = z.infer<typeof taskSchema>;
export type taskFormData = Pick<task, 'description' | 'name'>
// project Types
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(taskSchema)


});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,

    })
)
export type Project = z.infer<typeof projectSchema>

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
});

export const teamMembersSchema = z.array(teamMemberSchema);


export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>