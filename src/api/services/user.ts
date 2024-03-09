import { userModel } from "../models/user.model";
import bcrypt from "bcryptjs"
import { tokenGeneration } from "../helpers/jwt";
import { userSearch } from "../helpers/search";
import { deHashPassword, hashPassword } from "../helpers/hash.dehash";
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
            const hashedPassword = await hashPassword(password)
            console.log(hashedPassword)
           const token = await tokenGeneration('4hrs', {username, email})
            
            const userData = { username, email, password:hashedPassword, img_url: '' }
         
            const addUser = new userModel(userData)
            const saveToDb = await addUser.save()
            return { userInfo: saveToDb, token }
        } catch (error: any) {
            return new Error(`${error.message}`)
        }
    }

    static async Signin(body:{username:string, password:string}) {
      const {username, password} = body
        try {
            const findUser = await userSearch({ username })
           
            const { status, data } = findUser
           
            
            if (!status) {
                return new Error("Invalid Login Crendentails")
            }
            const verifyPassword = await deHashPassword(password, `${data.password}`)
            if (!verifyPassword) {
                return new Error("Invalid Pasword")
            }
            const token = await tokenGeneration("4hrs", { username: data.username, email: data.email });
            return token
            
      } catch (error:any) {
         return new Error(`${error.message}`)
      }
  }   
}