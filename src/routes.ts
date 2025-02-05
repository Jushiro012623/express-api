import { Application, NextFunction, Request, Response } from "express";
import config from "./config";
import { AuthRoute } from "./module/auth/authRoute";
export default (app : Application) => {
    const BASE_PATH = config.BASE_URL
    const routes = () => {
        app.use(BASE_PATH, AuthRoute)
    }
    routes()
}