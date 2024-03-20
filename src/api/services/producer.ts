import { messageSearch, userSearch } from "../helpers/search";
import { generateLink } from "../helpers/token";
import { MessageI } from "../interface/message";
import { messageModel } from "../models/message";

export class ProducerS{
    static async createMessageBox (data:MessageI) {
        try {
            // search if user exist
            const ifUserExist = await userSearch({ username: data.username })
            if (!ifUserExist.status) {
                return new Error("User validation error, try again")
            }

            // search if title already exist
            const ifTitleExist = await messageSearch({ title: data.title })
            if (ifTitleExist.status) {
                return new Error("Title already exist")
            }
            // creaet a new message box
            const link =  generateLink (data.username)
            const messageData = { ...data, link }
            const createNewMessage = new messageModel(messageData)
            const saveToDb = await createNewMessage.save()
            return saveToDb
            
        } catch (error:any) {
            return new Error(`${error.message}`)
        }
    }
}