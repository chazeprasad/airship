import { Paper } from "./Paper";
import { Request, Response, NextFunction, Router } from 'express'


class ActionController extends Paper {
    public router
    private $routes


    constructor() {
        super();

        this.router = Router()

        
        for ( const {method, url, middlewareList, actionName } of this.$routes) {
            if (middlewareList.length) {
                this.router[method](url, ...middlewareList, async (req:Request, res: Response, next:NextFunction) => {
                    try {
                        await this[actionName](req, res, next);
                    } catch (error) {
                        next(error);
                    }
                })
            } else {
                this.router[method](url, async (req:Request, res: Response, next:NextFunction) => {
                    try {
                        await this[actionName](req, res, next);
                    } catch (error) {
                        next(error);
                    }
                })
            }
        }
    }
}

export { ActionController }

