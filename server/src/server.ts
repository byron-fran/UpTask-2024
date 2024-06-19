import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'

dotenv.config()

const server = express()
connectDB()

export default server