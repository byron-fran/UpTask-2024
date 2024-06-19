import mongoose from "mongoose";
import colors from 'colors'
import {exit} from 'node:process';


export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL!)
        console.log(`${colors.blue.bold(connection.connection.host)} db success`)
    } catch (error : unknown) {
        console.log(colors.red.bold(`${error}`))
        exit(1)
        
    }
}