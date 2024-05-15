import 'dotenv/config.js'
import express from 'express'
import {connectDB} from "./db/index.js";
import app from './app.js';

const port = process.env.PORT || 8000;


connectDB()
.then(() => {
    app.listen(port , () => {
        console.log(`Server is running at ${port}`)
    })
})
.catch((err) => {
    console.log('Mongo db connection error', err)
})

