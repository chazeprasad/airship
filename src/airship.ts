import * as express from 'express'
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as logger from 'morgan';
import * as compress from 'compression';
import * as cors from 'cors';
import * as httpStatus from 'http-status';
import * as helmet from 'helmet';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';
import mongoose = require("mongoose"); //import mongoose
import * as expressWinston from 'express-winston';
import * as expressValidation from 'express-validation';
import { ApiError } from './error';
import { Request, Response, NextFunction } from 'express'


import { Paper } from './paper';

export interface IRoutable {
    configureRoutes():void;
}

declare global {
    namespace Express {
      interface Request {
        file: any;
        files: any;
        context: any;
      }
    }
  }


export class Airship extends Paper {
    public app: express.Application;
    public server: any
    public port:any;
    public staticDir:string = 'PATH'
    public rootDir:string = 'PATH'

    constructor(){
        super();

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        this.port = this.normalizePort(process.env.PORT || 8080);
        this.app = express();


        // this.init();



    }
    async init(){
        await this.configureMiddleware();
        await this.configErrorHandling();
    }

    async configureMiddleware() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        if (process.env.NODE_ENV === 'development') {
            this.app.use(logger('dev'));
        }

        // Public directory
        this.app.use(express.static(this.staticDir))

        
        // secure apps by setting various HTTP headers
        this.app.use(helmet());

        // enable CORS - Cross Origin Resource Sharing
        const corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 200
        }

       
        // this.app.options('*', cors(corsOptions))
        this.app.use(cors(corsOptions))

        this.initFileUpload();
        // await this.initMongoose();
       

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(cookieParser());
        this.app.use(compress());
        this.app.use(methodOverride());

        this.app.use((req:Request, res:Response, next:NextFunction) => {
            req.context = {};
            next();
        })
        

        
        // enable detailed API logging in dev env
        if (process.env.NODE_ENV === 'development') {
            expressWinston.requestWhitelist.push('body');
            expressWinston.responseWhitelist.push('body');
        }

        

    }

    private initFileUpload(): void {
        var DIR = this.rootDir + '/public/file/';

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, DIR)
            },
            filename: function (req, file, cb) {
                // cb(null, file.fieldname + '-' + Date.now())
                let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
                cb(null, file.fieldname + '-' + Date.now() + ext)
          }
        })
        
        var upload = multer({ storage: storage })

        this.app.post('/api/upload/file', (req, res, next) => {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
            upload.single('file')(req, res, (err) => {
                if(err){ next(err) }
                res.json({filename: req.file.filename});
            })
        })

        this.app.post('/api/upload/files', (req, res, next) => {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
            console.log(req.file)

            upload.array('file', 100)(req, res, (err) => {
                if(err){ next(err) }
                console.log(req.files)
                let fileList:Array<any> = req.files as Array<any>;

                let list:Array<any> = Array.from( fileList, (x) => {
                    return x.filename
                })
                res.json({ files: list })

            })

        })
    }

    private async initMongoose() {

        const DB_URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/paperboat';

        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;

        //connect to mongoose
        await mongoose.connect(DB_URL, { useNewUrlParser: true });

    }

    configErrorHandling() {
        // if error is not an instanceOf ApiError, convert it.

        

        this.app.use((err, req, res, next) => {
            // console.log('=====================');
            // console.log(err);
            // return;
            if (err instanceof expressValidation.ValidationError) {
                // validation error contains errors which is an array of error each containing message[]
                const unifiedErrorMessage = err.errors.map((error:any) => error.messages.join('. ')).join(' and ');
                const error = new ApiError(unifiedErrorMessage, err.status, true);
                return next(error);
            } else if (!(err instanceof ApiError)) {
                const apiError = new ApiError(err.message, err.status, err.isPublic);
                return next(apiError);
            }
            console.log('========')
            console.log(err)
            return next(err);
        });

        // console.log('========')
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            const err = new ApiError('API not found', httpStatus.NOT_FOUND);
            return next(err);
        });

        // log error in winston transports except when executing test suite
        /* const winstonInstance = new ((winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    json: true,
                    colorize: true
                })
            ]
        }); */

        /* if (process.env.NODE_ENV !== 'test') {
            this.app.use(expressWinston.errorLogger({
                winstonInstance
            }));
        } */

        // error handler, send stacktrace only during development
        this.app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
            res.status(err.status).json({
                message: err.isPublic ? err.message : err.message,
                // message: err.isPublic ? err.message : httpStatus[err.status],
                stack: process.env.NODE_ENV === 'development' ? err.stack : {}
            })
        );
    }



    normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }
}

