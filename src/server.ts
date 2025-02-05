import { Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import hpp from "hpp";
import helmet from "helmet";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorHandler";
import config from "./config";
import applicationRoutes from "./routes";
import rateLimit from 'express-rate-limit'
import { AppError } from "./utils/appError";
const xss = require('xss-clean');

export default class Server {
    private app : Application
    constructor(app : Application) {
        this.app = app;
    }
    public start() : void {
        this.setupSecurityMiddleware(this.app)
        this.setupExpressMiddleware(this.app)
        this.setupRouteMiddleware(this.app)
        this.startServer(this.app)
    }
    private setupRouteMiddleware(app : Application) : void {
        applicationRoutes(app)
        app.use('*', async (req : Request, res : Response, next : NextFunction) : Promise<void>  => {
            return next(new AppError('Request Not Found', 404))
        })
        app.use(errorHandler)
    }
    private setupExpressMiddleware(app : Application): void {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
    private setupSecurityMiddleware(app : Application) : void {
        app.use(cors())
        app.use(rateLimit(config.RATE_LIMITER))
        app.use(helmet())
        app.use(xss())
        app.use(hpp())
    }
    private startServer(app : Application) : void {
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        })
    }
}

