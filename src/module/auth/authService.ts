import Password_Reset_Tokens from '../resetPasswordToken/resetPasswordTokenModel';
import { TResetPasswordData, TUser } from './authInterface';
import User from '../user/userModel'
import moment from "moment"
import { Op } from "sequelize";

const findUser = async (where : any) : Promise<any> => { 
    const query : any = {
        where: where,
    }
    // if(include_roles_and_permissions){
    //     query.include = {
    //         model: db.Roles,
    //         include: db.Permission,}
    // }
    return await User.findOne(query)  
}
const createUser = async (user : TUser) : Promise<TUser> => {
    return await User.create(user)
}
const savePasswordResetToken = async (data : TResetPasswordData) : Promise<Password_Reset_Tokens> => {
    return await Password_Reset_Tokens.create(data)
}
const findResetToken = async (token : string) : Promise<Password_Reset_Tokens | null> => {
    return await Password_Reset_Tokens.findOne({
        where : {
            token : token, 
            expiration: {
                [Op.lte]: moment()
            }
        }
    })
}

export default {
    findUser,
    createUser,
    savePasswordResetToken,
    findResetToken
}
