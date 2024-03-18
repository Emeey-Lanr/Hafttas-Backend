import express, { Express } from "express";
import { middleware } from "./api/middleware/app.middle-ware";
import { dotenvF } from "./api/middleware/dotenv";
import mongoose from "mongoose";
const app: Express = express()
middleware(app)
dotenvF()

const PORT = process.env.PORT_NUMB
const URI = process.env.DB_URI








app.listen(PORT, async () => {
    try {
        const connectDb = await mongoose.connect(`${URI}`)
        console.log(`app has connected`)
    } catch (error:any) {
        console.log(error.message)
    }
})