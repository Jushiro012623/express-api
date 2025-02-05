import { Application, NextFunction, Request, Response } from "express";
import config from "./config";
import { AuthRoutes } from "./module/auth/authRoute";
import { UserRoutes } from "./module/user/userRoute";
const expressListRoutes = require('express-list-routes');
export default (app : Application) => {
    const BASE_PATH = config.BASE_URL
    const routes = () => {
        app.use(BASE_PATH  + '/admin/users', UserRoutes)
        app.use(BASE_PATH, AuthRoutes)
        expressListRoutes(app);
    }
    routes()
}