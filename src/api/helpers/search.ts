import { userModel } from "../models/user.model"
export const userSearch = async (searchData:any) => {

    const exist = await userModel.findOne(searchData)
    let existInfo:{data:any, status:boolean} = { data: exist, status: true };
        if (exist) {
            return  existInfo
    }
    existInfo.status = false
    
   return existInfo

}