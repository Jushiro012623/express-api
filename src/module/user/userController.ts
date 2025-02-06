import { NextFunction, Request, Response } from "express";
import CrudService from "../../service/crudService";
import User from "./userModel";
import verifyRequest from "../../helpers/verifyRequest";
import HTTP_STATUS from '../../constants'
import AuthService from "../auth/authService";
import { AppError } from "../../utils/appError";
import { hash } from "../../utils/bcryptFunction";
import { Op } from "sequelize";

export const userCrudService = new CrudService(User, 'User')

export const createUser = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
     verifyRequest(req, res)
        const { username, password, email } = req.body
    
        const usernameEmailQuery = { [Op.or]: [ { email }, { username }] }
        const isUserExist = await AuthService.findUser(usernameEmailQuery)
        if(isUserExist) {
            if(isUserExist.username === username){
                return next(new AppError('Username already exists', HTTP_STATUS.CONFLICT));
            }
            if(isUserExist.email === email){
                return next(new AppError('Email already exists', HTTP_STATUS.CONFLICT));
            }
        }
        const hashPassword = await hash(password)
        const user = await AuthService.createUser({email, password : hashPassword , username})
        
        // TODO Create Dynamic Role


        res.status(HTTP_STATUS.CREATED).json({
            message: 'User registered successfully',
            success: true,
            data : {
                user : {
                    email: user.email,
                    username: user.username,
                }
            },
        })
}
