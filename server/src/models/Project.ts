import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { TasksInterface } from "./Tasks";

export interface ProjectInterface extends Document  {
    projectName : string,
    clientName : string,
    description : string,
    tasks : PopulatedDoc<TasksInterface & Document>[]

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
    ]
}, {timestamps : true})

const Project = mongoose.model<ProjectInterface>('Project', ProjectSchema)
export default Project