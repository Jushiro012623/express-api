import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AppError } from "../utils/appError";
import HTTP_STATUS from "../constants";
interface CustomRequest extends Request {
    user?: JwtPayload | string;
}
export const requireAuthUser = (req : CustomRequest, res : Response, next : NextFunction) => {
    const token = getToken(req)
    if (!token) return next(new AppError(`Access denied: Please sign in to continue.`, HTTP_STATUS.UNAUTHORIZED))
    try {
        const user = jwt.verify(token, config.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return next(new AppError(`Invalid or expired token: Authentication failed.`, HTTP_STATUS.UNAUTHORIZED))
    }
};
export const requireGuestUser = (req : Request, res : Response, next : NextFunction) => {
    const token = getToken(req)
    if (token) return next(new AppError(`Access denied: Please log out to access this resource`, HTTP_STATUS.UNAUTHORIZED))
    next();
};
const getToken = (req : Request) => {
    const authHeader = req.headers["authorization"];
    return authHeader && authHeader.split(" ")[1];
}
export default {
    requireAuthUser,
    requireGuestUser,
}
