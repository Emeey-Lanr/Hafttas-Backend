import { Request, Response } from "express";
import { ProducerS } from "../services/producer";
import { errorResponse, succesResponse } from "../helpers/response";
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
      
    } catch (error:any) {
      
    }
  }
  static async deleteAnoymous(req: Request, res: Response) {
     try {
     } catch (error: any) {}
  }
  static async getSingleAnonymousDetails(req: Request, res: Response) {
 try {
 } catch (error: any) {}
  }
  static async deleteMessage(req: Request, res: Response) {
     try {
     } catch (error: any) {}
  }
}
