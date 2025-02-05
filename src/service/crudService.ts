import {NextFunction, Response, Request} from 'express'
import HTTP_STATUS from '../constants'
import catchAsync from '../utils/catchAsync'
import { AppError } from '../utils/appError'
export default class CrudService {
    private model
    private modelLabel
    constructor(Model : any, modelLabel : string){
        this.model = Model
        this.modelLabel = modelLabel
    }
    private notFound(next : NextFunction) { 
        return next( new AppError(`No ${this.modelLabel} Found`, HTTP_STATUS.NOT_FOUND) )
    }

    public deleteOne = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
        const id = req.params.id

        const result = await this.model.destroy({ where: { id } })
        if (!result) return this.notFound(next)

        res.status(HTTP_STATUS.NO_CONTENT).json({
            success: true,
            message: `${this.modelLabel} deleted sucessfully`,
            data: null
        });
    });
    public updateOne = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {
        const id = req.params.id
        
        const result = await this.model.update(req.body,{ where: { id } });
        if (!result) return this.notFound(next)

        const updatedResult = await this.model.findByPk(id)
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: `${this.modelLabel} updated  sucessfully`,
            data: updatedResult,
        });
    });

    public createOne = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {

        const result = await this.model.create({...req.body,});
            res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: `${this.modelLabel} created sucessfully`,
            data: result,
        })
    });

    public getOne = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {
        const id = req.params.id

        const result = await this.model.findByPk(id);
        if (!result) return this.notFound(next)

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: `${this.modelLabel} retrieved sucessfully`,
            data: result,
        });
    });
    public getAll = catchAsync(async (req : Request, res : Response, next : NextFunction)  => {

        const result = await this.model.findAll({
            attributes : {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        });
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: `${this.modelLabel}s retrieved sucessfully`,
            data: result,
        });
    });
    
}
