import express,{ Express } from "express";
import cors from "cors"
import { userAuthRoutes } from "../routes/auth";
import { producerRoutes } from "../routes/producer";
export  const middleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(express.json())
    app.use('/auth', userAuthRoutes)
    app.use('/message', producerRoutes)
    
}