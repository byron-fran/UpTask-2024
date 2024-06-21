import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import ProjectRoutes from './routes/Project.routes'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'

dotenv.config()

const server = express();

server.use(express.json())
server.use(cors(corsConfig))
server.use(morgan('dev'))
server.use('/api/projects', ProjectRoutes)
connectDB()
export default server