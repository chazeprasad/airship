import * as express from 'express';
import { Paper } from './paper';
export interface IRoutable {
    configureRoutes(): void;
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
export declare class Airship extends Paper {
    app: express.Application;
    server: any;
    port: any;
    staticDir: string;
    rootDir: string;
    constructor();
    init(): Promise<void>;
    configureMiddleware(): Promise<void>;
    private initFileUpload;
    private initMongoose;
    configErrorHandling(): void;
    normalizePort(val: number | string): number | string | boolean;
}
