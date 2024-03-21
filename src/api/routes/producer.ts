import express from "express"
import { validateOnCreate } from "../validator/message"
import { ProducerC } from "../controllers/producer"

export const producerRoutes = express.Router()

producerRoutes.post("/create", validateOnCreate, ProducerC.createMessageBox)
producerRoutes.get("/get/all/anonymous", ProducerC.getAllAnonymousTitle)
producerRoutes.delete("/delete/:_id", ProducerC.deleteAnoymous)
producerRoutes.get("/fetch/single/anonymous/data", ProducerC.getSingleAnonymousDetails)
producerRoutes.get("/fetch/data/on/message", ProducerC.getAnoymousDetailsWhenUAboutToSendAMessage)