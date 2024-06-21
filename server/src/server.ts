import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import ProjectRoutes from './routes/Project.routes'
import AuthRoutes from './routes/Auth.routes'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'

dotenv.config()

const server = express();

server.use(express.json())
server.use(cors(corsConfig))
server.use(morgan('dev'))
server.use('/api/projects', ProjectRoutes);
server.use('/api/auth', AuthRoutes);

connectDB()
export default server