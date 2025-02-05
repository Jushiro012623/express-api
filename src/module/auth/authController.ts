import { Response, NextFunction, Request } from "express";
import AuthService from "./authService";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/appError";
import { compare, hash } from "../../utils/bcryptFunction"
import HTTP_STATUS from '../../constants'
import config from "../../config";
import crypto from 'crypto'
import moment from 'moment'
import nodemailer from "../../lib/nodemailer";
import verifyRequest from "../../helpers/verifyRequest";

export const login = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
    verifyRequest(req, res)
    const { email, password, login_type } = req.body;

    const user = await AuthService.findUser({email})
    if(!user) return next(new AppError('User not found', HTTP_STATUS.NOT_FOUND));

    const isPasswordMatches = await compare(password, user.password)
    if(!isPasswordMatches) return next(new AppError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED));

    const token = jwt.sign(
        { id: user.id }, 
        config.JWT_SECRET, 
        { expiresIn: config.JWT_EXPIRE }
    );
    res.status(HTTP_STATUS.OK).json({
        message: 'Login Successfully',
        success: true,
        data : {
            accessToken: token,
            user : {
                email: user.email,
                username: user.username,
            }
        },
    })
}
export const register = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
    verifyRequest(req, res)
    const { username, password, email } = req.body

    const isUserExist = await AuthService.findUser({email})
    if(isUserExist) return next(new AppError('Email already exists', HTTP_STATUS.CONFLICT));

    const hashPassword = await hash(password)
    const user = await AuthService.createUser({email, password : hashPassword , username})

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
export const logout = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
    res.status(HTTP_STATUS.OK).json({
        message: 'Logout successfully',
        success: true,
    })
}
export const forgotPassword = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
    verifyRequest(req, res)
    const { email } = req.body

    const user = await AuthService.findUser({email})
    if(!user) return next(new AppError('User not found', HTTP_STATUS.NOT_FOUND));

    const resetToken = crypto.randomBytes(20).toString('hex')
    const tokenExpiry = moment().add(30, 'minutes').toISOString()

    const passwordResetToken = {token : resetToken, expiration : tokenExpiry, user_id : user.id}
    await AuthService.savePasswordResetToken(passwordResetToken)

    const transporter = nodemailer.transporter()
    const mailOptions = nodemailer.mailOptions(user.email, resetToken)

    const sendMail = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", sendMail.messageId);

    res.status(HTTP_STATUS.OK).json({
        message: 'Reset password link sent successfully',
        success: true,
        reset_token : resetToken
    })
}
export const resetPasswordToken = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
    verifyRequest(req, res)
    const { token } = req.params;
    const resetToken = await AuthService.findResetToken(token);
    if (!resetToken) return next(new AppError('Invalid or expired token', HTTP_STATUS.NOT_FOUND));
    res.status(HTTP_STATUS.OK).send(`
        <form method="post" action="${config.BASE_URL}">
            <input type="hidden" name="token" value="${token}" />
            <input type="password" name="password" required placeholder="New Password" />
            <input type="submit" value="Reset Password" />
        </form>
    `);
}
export const resetPassword = async (req: Request , res: Response, next: NextFunction) : Promise<void> => {
    verifyRequest(req, res)
    const { token, password } = req.body;

    const resetToken = await AuthService.findResetToken(token);
    if (!resetToken) return next(new AppError('Invalid or expired token', HTTP_STATUS.NOT_FOUND));

    const user = await AuthService.findUser({id : resetToken.user_id})
    if (!user) return next(new AppError('User not found', HTTP_STATUS.NOT_FOUND));

    const isPasswordMatches = await compare(password, user.password)
    if(isPasswordMatches) return next(new AppError('New password cannot be the same as the previous one.', HTTP_STATUS.CONFLICT));

    const hashPassword = await hash(password)
    await user.update({password : hashPassword})

    await resetToken.destroy()

    res.status(HTTP_STATUS.OK).json({
        message: 'Password reset successfully',
        success: true,
    })


}

export default {
    login,
    register,
    logout,
    forgotPassword,
    resetPasswordToken,
    resetPassword,
}
