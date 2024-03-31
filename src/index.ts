import express, { Express } from "express";
import { middleware } from "./api/middleware/app.middle-ware";
import { dotenvF } from "./api/middleware/dotenv";
import mongoose from "mongoose";
const app: Express = express()
middleware(app)
dotenvF()

const PORT = process.env.PORT
const URI = process.env.URI








app.listen(PORT, async () => {
    try {
        const connectDb = await mongoose.connect(`${URI}`)
        console.log(`app has connected`)
    } catch (error:any) {
        console.log(error.message)
    }
})