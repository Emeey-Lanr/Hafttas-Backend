import { messageSearch, userSearch } from "../helpers/search";
import { generateLink, tokenDataRetrieval } from "../helpers/token";
import { MessageI } from "../interface/message";
import { messageModel } from "../models/message";

export class ProducerS {
  static async createMessageBox(data: MessageI) {
    try {
      // search if user exist
      const ifUserExist = await userSearch({ username: data.username });
      if (!ifUserExist.status) {
        return new Error("User validation error, try again");
      }

      // search if title already exist
      const ifTitleExist = await messageSearch({ title: data.title });
      if (ifTitleExist.status) {
        return new Error("Title already exist");
      }
      // creaet a new message box
      const link = generateLink(data.username);
      const messageData = { ...data, link };
      const createNewMessage = new messageModel(messageData);
      const saveToDb = await createNewMessage.save();
      return saveToDb;
    } catch (error: any) {
      return new Error(`${error.message}`);
    }
  }
  static async getAllAnonymousTitle(token:string) {
      try {
        //   use the user's signin token to fetch the user's data
          const getUserData = await tokenDataRetrieval(token) as { username: string, email: string } 
        //   use the data fetched to find all the anonymous created
          const getAll = await messageModel.find({ username: getUserData.username })
        //  if it's emepty return an error
         
          return getAll
      } catch (error: any) {
          return new Error("An error occured getting list")
    }
  }
  static async deleteAnoymous(data:{_id:string, username:string}) {
      const {_id, username}  = data
      try {
          
          const deleteAnonymousData = await messageModel.findOneAndDelete({ _id })
          const findAll = await messageModel.find({ username })
          return findAll
          
      } catch (error: any) {
          return new Error(`${error.message}`)
    }
  }
  static async getSingleAnonymousDetails() {
    try {
    } catch (error: any) {}
  }
  static async addMessage() {}
  static async deleteMessage() {
    try {
    } catch (error: any) {}
  }
}