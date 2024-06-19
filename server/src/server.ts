import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import ProjectRoutes from './routes/Project.routes'
dotenv.config()

const server = express();

server.use(express.json())

server.use('/api/projects', ProjectRoutes)
connectDB()
export default server