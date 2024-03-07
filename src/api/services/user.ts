import { userModel } from "../models/user.model";
import bcrypt from "bcryptjs"
import { tokenGeneration } from "../helpers/jwt";
export class UserS {
    static async signup(body:{username:string, email:string, password:string}) {
        const {username, email, password} = body
        try {
            const userMailExist = await userModel.findOne({ email })
    
            if (userMailExist) {
                return new Error("Email already exist")
            }
            const userUsernameExist = await userModel.findOne({ username })
            if (userUsernameExist) {
                return new Error("Username already Exist")
            }
            const hashPassword = await bcrypt.hash(password, 5)
           const token = await tokenGeneration('4hrs', {username, email})
            
            const userData = { ...body, img_url: '' }
         
            const addUser = new userModel(userData)
            const saveToDb = await addUser.save()
            return saveToDb
        } catch (error: any) {
            return new Error(`${error.message}`)
        }
    }
}