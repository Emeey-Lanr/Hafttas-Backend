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

    } catch (error: any) { }
  }
  static async getSingleAnonymousDetails(req: Request, res: Response) {
    try {
   
 } catch (error: any) {}
  }
  static async addMessage(req: Request, res: Response) {
    
  }
  static async deleteMessage(req: Request, res: Response) {
     try {
     } catch (error: any) {}
  }
}
