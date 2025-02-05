import { Router } from "express";
import {login, register, logout, forgotPassword, resetPassword, resetPasswordToken} from "./authController";
import catchAsync from "../../utils/catchAsync";
import { loginValidation, registerValidation, emailValidation, resetPasswordValidation } from "./authValidation";
import { requireAuthUser, requireGuestUser } from "../../middlewares/authMiddleware";
const route = Router();

// AUTHENTICATION
route.post('/login', 
    requireGuestUser, 
    loginValidation, 
    catchAsync(login)
);
route.post('/register', 
    requireGuestUser,
    registerValidation, 
    catchAsync(register)
);
route.post('/logout', 
    requireAuthUser, 
    catchAsync(logout)
);
route.post('/forgot-password', 
    requireGuestUser, 
    emailValidation, 
    catchAsync(forgotPassword)
);
route.get('/reset-password/:token', 
    requireGuestUser, 
    catchAsync(resetPasswordToken)
);
route.post('/reset-password', 
    requireGuestUser, 
    resetPasswordValidation,
    catchAsync(resetPassword)
);

export {route as AuthRoutes}