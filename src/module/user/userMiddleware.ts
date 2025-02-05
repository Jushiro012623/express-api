import { NextFunction, Request, Response } from "express";
import User from "./userModel";
import { AppError } from "../../utils/appError";
import HTTP_STATUS from "../../constants";
import { log } from "console";

export const requireUniqueUser = async (req : Request, res : Response, next : NextFunction) => {
    const { email } = req.body;
    const id = req.params.id;
    
    const user = await User.findByPk(id);
    if (!user) return next(new AppError("User not found", HTTP_STATUS.NOT_FOUND));
    
    const isUserUnique = user.email === email
    if (!isUserUnique) return next(new AppError("Email already in use", HTTP_STATUS.CONFLICT));
    next()
}