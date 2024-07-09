import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { TasksInterface } from "./Tasks";
import { UserInterface } from "./User";

export interface ProjectInterface extends Document  {
    projectName : string,
    clientName : string,
    description : string,
    tasks : PopulatedDoc<TasksInterface & Document>[],
    manager : PopulatedDoc<UserInterface & Document>,
    team : PopulatedDoc<UserInterface & Document>[]

}

const ProjectSchema: Schema = new Schema({
    projectName : {
        type : String,
        required : true,
        trim : true,
        
    },
    clientName : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    tasks : [
        {
            type : Types.ObjectId,
            ref : 'Task'
        }
    ],
    manager : {
        type : Types.ObjectId,
        ref : 'User'
    },

    team : [
        {
            type : Types.ObjectId,
            ref : 'User'
        }
    ],
    
}, {timestamps : true})

const Project = mongoose.model<ProjectInterface>('Project', ProjectSchema)
export default Project