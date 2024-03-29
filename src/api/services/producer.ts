import { messageSearch, userSearch } from "../helpers/search";
import { generateLink, tokenDataRetrieval } from "../helpers/token";
import { AddMessageBodyI, MessageI } from "../interface/message";
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
  static async getAllAnonymousTitle(token: string) {
    try {
      //   use the user's signin token to fetch the user's data
      const getUserData = (await tokenDataRetrieval(token)) as {
        username: string;
        email: string;
      };
      //   use the data fetched to find all the anonymous created
      const getAll = await messageModel.find({
        username: getUserData.username,
      });
      //  if it's emepty return an error

      return getAll;
    } catch (error: any) {
      return new Error("An error occured getting list");
    }
  }

  static async deleteAnoymous(data: { _id: string; username: string }) {
    const { _id, username } = data;
    try {
      //   delete via the params id
      const deleteAnonymousData = await messageModel.findOneAndDelete({ _id });
      //   get the remaining data vai the query id
      const findAll = await messageModel.find({ username });
      return findAll;
    } catch (error: any) {
      return new Error(`${error.message}`);
    }
  }

  static async getSingleAnonymousDetails(_id: string) {
    try {
      //   we use the db id to fech t
      const messageBoxSearch = await messageSearch({ _id });
      if (!messageBoxSearch.status) {
        return new Error("Unable to fetch data");
      }
      return messageBoxSearch.data;
    } catch (error: any) {
      return new Error("An error occured fetching data");
    }
  }
    static async getAnoymousDetailsWhenUAboutToSendAMessage(username: string, link: string) {
    // This is a get request for getting the details
    // about the link before those using the link send a message
   try {
       const searchUser = await userSearch({ username })
       if (!searchUser.status) {
           return new Error("Access not available")
       }
       const searchMessageBox = await messageSearch({ link })
       if (!searchMessageBox.status) {
           return new Error("Acsess not available")
       }
       if (searchUser.data.username !== searchMessageBox.data.username) {
           return new Error("Invalid Link access")
       }
       return searchMessageBox.data
       
   } catch (error:any) {
    return new Error(`${error.message}`)
   }
  }

  static async addMessage(data:AddMessageBodyI ) {
    const {username, date,time,message,link} = data
      try {
        //   we search if a messagemodel has the link and username
          const searchMessageBox = await messageSearch({ username, link })
          if (!searchMessageBox.status ) {
              return new Error("link doesn't exist")
          }
        //   if it does exist, we push into the message box
          let messageDetails = {message, time, date} 
          searchMessageBox.data.messageBox.push(messageDetails)
        //   and update it with the updated data
          const update = await messageModel.findOneAndUpdate({ username, link }, searchMessageBox.data)
          
    } catch (error:any) {
         return new Error(`${error.message}`);
       }
      
  }
  static async deleteMessage(data:{db_id:string, message_id:number}) {
      try {
          const searchMessageBox = await messageSearch({ _id: data.db_id })
          if (!searchMessageBox.status) {
              return new Error("Invalid db id")
          }
          searchMessageBox.data.messageBox = searchMessageBox.data.messageBox.filter((_:string, id:number)=> id !== data.message_id)
          const update = await messageModel.findByIdAndUpdate({ _id: data.db_id }, searchMessageBox.data)
          const updatedVersion = await messageSearch({ _id: data.db_id })
          return updatedVersion.data
      } catch (error: any) {
          return new Error(`${error.message}`)
       }
  }
}
