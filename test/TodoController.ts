import { Request, Response, NextFunction } from 'express'
import { ActionController, Get, Api, Post, Put, Status } from "../src/index";

function setValue(req:Request, res: Response, next:NextFunction){
    
    next()
}

@Api('/todo')
class TodoController extends ActionController {
    constructor(){
        super();

    }

    @Get('/', [setValue])
    getTodo(req:Request, res: Response, next:NextFunction){
        res.status(Status.OK).send({ message: 'OK' })
    }

    @Post('/')
    create(req:Request, res: Response, next:NextFunction){
        res.status(Status.CREATED).send(req.body);
    }

    @Put('/:id')
    update(req:Request, res: Response, next:NextFunction){
        res.sendStatus(Status.NO_CONTENT)
    }
}

export { TodoController };