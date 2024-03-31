import { userModel } from "../models/user.model"
import { messageModel } from "../models/message";
export const userSearch = async (searchData:any) => {

    const exist = await userModel.findOne(searchData)
    let existInfo:{data:any, status:boolean} = { data: exist, status: true };
        if (exist) {
            return  existInfo
    }
    existInfo.status = false
    
   return existInfo

}


export const messageSearch = async (searchData:any) => {
    const exist = await messageModel.findOne(searchData)
        let existInfo: { data: any; status: boolean } = {
          data: exist,
          status: true,
    };
      if (exist) {
        return existInfo;
    }
    
    existInfo.status = false;

    return existInfo;

}