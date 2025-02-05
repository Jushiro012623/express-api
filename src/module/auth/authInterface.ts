import { Request } from "express";


export interface CustomRequest extends Request {
    user : TUser
}
export type TResetPasswordData = {
    token : string
    expiration : string
    user_id : number
}
export type TUser = {
    username: string,
    email: string,
    password: string
}