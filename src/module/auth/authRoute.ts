import { Router } from "express";
import authUser from "./authController";
import catchAsync from "../../utils/catchAsync";
import { loginValidation, registerValidation, emailValidation, resetPasswordValidation } from "./authValidation";
import { requireAuthUser, requireGuestUser } from "../../middlewares/authMiddleware";
const route = Router();

// AUTHENTICATION
route.post('/login', 
    requireGuestUser, 
    loginValidation, 
    catchAsync(authUser.login)
);
route.post('/register', 
    requireGuestUser,
    registerValidation, 
    catchAsync(authUser.register)
);
route.post('/logout', 
    requireAuthUser, 
    catchAsync(authUser.logout)
);
route.post('/forgot-password', 
    requireGuestUser, 
    emailValidation, 
    catchAsync(authUser.forgotPassword)
);
route.get('/reset-password/:token', 
    requireGuestUser, 
    catchAsync(authUser.resetPasswordToken)
);
route.post('/reset-password', 
    requireGuestUser, 
    resetPasswordValidation,
    catchAsync(authUser.resetPassword)
);

export {route as AuthRoute}