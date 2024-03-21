import { Request, Response } from "express";
import { ProducerS } from "../services/producer";
import { errorResponse, succesResponse } from "../helpers/response";
import { MessageI } from "../interface/message";
export class ProducerC {
  static async createMessageBox(req: Request, res: Response) {
    try {
      const create = await ProducerS.createMessageBox(req.body);
      if (create instanceof Error) {
        return errorResponse(res, 400, `${create.message}`);
      }
      return succesResponse(res, 200, "Created succesfully", create);
    } catch (error: any) {
      return errorResponse(res, 400, `An error occured creating`);
    }
  }
  static async getAllAnonymousTitle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const getAll = await ProducerS.getAllAnonymousTitle(`${token}`) as MessageI[]
      if (getAll instanceof Error) {
        return errorResponse(res, 400, `${getAll.message}`);
      }
         return succesResponse(res, 200, `${getAll.length < 0 ? 'List is empty' : 'Curated succesfully'}`, getAll);
    } catch (error:any) {
       return errorResponse(res, 400, `An error occured getting`);
    }
  }

  static async deleteAnoymous(req: Request, res: Response) {
    try {
      const deleteAnonymousData = await ProducerS.deleteAnoymous({ _id: `${req.params._id}`, username:`${req.query.username}` })
      if (deleteAnonymousData instanceof Error) {
         return errorResponse(res, 400, `${deleteAnonymousData.message}`);
      }
        return succesResponse(res, 200, "deleted succesfully", deleteAnonymousData);

    } catch (error: any) {
             return errorResponse(res, 400, `An error occured deleting`);
     }
  }

  static async getSingleAnonymousDetails(req: Request, res: Response) {
    try {
      // on the frontend the url/title/dbid
      const dbId = req.headers.authorization?.split(" ")[1];
      const getData = await ProducerS.getSingleAnonymousDetails(`${dbId}`)
      if (getData instanceof Error) {
            return errorResponse(res, 400, `${getData.message}`);
      }
      
              return succesResponse(res, 200, "data fetched succesfully",  getData);

    } catch (error: any) {
               return errorResponse(res, 400, `An error occured fetching data`);
 }
  }
  
  static async getAnoymousDetailsWhenUAboutToSendAMessage(req: Request, res: Response) {
    // This is a get request for getting the details
    // about the link before those using the link send a message
    // in the bearer token is should be `bearer {username}<*>{link}`
   try {
     const details = req.headers.authorization?.split(" ")[1].split("<*>") as [string, string]  
     const getDetails = await ProducerS.getAnoymousDetailsWhenUAboutToSendAMessage(`${details[0]}`, `${details[1]}`)
        if (getDetails instanceof Error) {
          return errorResponse(res, 400, `${getDetails.message}`);
        }

        return succesResponse(res, 200, "data fetched succesfully", getDetails);

   } catch (error) {
           return errorResponse(res, 400, `An error occured fetching data`);
   }
    
  }


  static async addMessage(req: Request, res: Response) {
    try {
      const addMessageInsideBox = await ProducerS.addMessage(req.body)

      if (addMessageInsideBox instanceof Error) {
         return errorResponse(res, 400, `${addMessageInsideBox.message}`);
      }
      return succesResponse(res, 200, "message delivered successfully", {});
     } catch (error: any) { 
           return errorResponse(res, 400, `An error occured adding message`);
    }
    
  }

  static async deleteMessage(req: Request, res: Response) {
    try {
      const deleteMsg = await ProducerS.deleteMessage(req.body) 
      if (deleteMsg instanceof Error) {
        return errorResponse(res, 400, `${deleteMsg.message}`)
      }
      return succesResponse (res, 200, 'Message deleted successfully', deleteMsg)
    } catch (error: any) {
         return errorResponse(res, 400, `An error occured deleteing message`);
     }
  }
}
