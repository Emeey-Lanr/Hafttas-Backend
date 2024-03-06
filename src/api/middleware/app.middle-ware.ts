import express,{ Express } from "express";
import cors from "cors"
export  const middleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use(express.json())
    
}