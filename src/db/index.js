import mongoose from 'mongoose'
import 'dotenv/config.js'
import { DB_NAME } from '../constants.js'

const mongoUrl = process.env.MONGODB_URL
export const connectDB = async () => {
    try {
        const connectIns = await mongoose.connect(`${mongoUrl}/${DB_NAME}`)
        console.log('MongoDB Connected');
    }catch(error) {
        console.log("MongoDB connetion error",error.message);
    }
}