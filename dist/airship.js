"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var logger = require("morgan");
var compress = require("compression");
var cors = require("cors");
var httpStatus = require("http-status");
var helmet = require("helmet");
var multer = require("multer");
var mongoose = require("mongoose"); //import mongoose
var expressWinston = require("express-winston");
var expressValidation = require("express-validation");
var error_1 = require("./error");
var paper_1 = require("./paper");
var Airship = /** @class */ (function (_super) {
    __extends(Airship, _super);
    function Airship() {
        var _this = _super.call(this) || this;
        _this.staticDir = 'PATH';
        _this.rootDir = 'PATH';
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        _this.port = _this.normalizePort(process.env.PORT || 8080);
        _this.app = express();
        return _this;
        // this.init();
    }
    Airship.prototype.init = function () {
        this.configureMiddleware();
        this.configErrorHandling();
    };
    Airship.prototype.configureMiddleware = function () {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        if (process.env.NODE_ENV === 'development') {
            this.app.use(logger('dev'));
        }
        // Public directory
        this.app.use(express.static(this.staticDir));
        // secure apps by setting various HTTP headers
        this.app.use(helmet());
        // enable CORS - Cross Origin Resource Sharing
        var corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 200
        };
        // this.app.options('*', cors(corsOptions))
        this.app.use(cors(corsOptions));
        this.initFileUpload();
        this.initMongoose();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser());
        this.app.use(compress());
        this.app.use(methodOverride());
        this.app.use(function (req, res, next) {
            req.context = {};
        });
        // enable detailed API logging in dev env
        if (process.env.NODE_ENV === 'development') {
            expressWinston.requestWhitelist.push('body');
            expressWinston.responseWhitelist.push('body');
        }
    };
    Airship.prototype.initFileUpload = function () {
        var DIR = this.rootDir + '/public/file/';
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, DIR);
            },
            filename: function (req, file, cb) {
                // cb(null, file.fieldname + '-' + Date.now())
                var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
                cb(null, file.fieldname + '-' + Date.now() + ext);
            }
        });
        var upload = multer({ storage: storage });
        this.app.post('/api/upload/file', function (req, res, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
            upload.single('file')(req, res, function (err) {
                if (err) {
                    next(err);
                }
                res.json({ filename: req.file.filename });
            });
        });
        this.app.post('/api/upload/files', function (req, res, next) {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
            console.log(req.file);
            upload.array('file', 100)(req, res, function (err) {
                if (err) {
                    next(err);
                }
                console.log(req.files);
                var fileList = req.files;
                var list = Array.from(fileList, function (x) {
                    return x.filename;
                });
                res.json({ files: list });
            });
        });
    };
    Airship.prototype.initMongoose = function () {
        var DB_URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/paperboat';
        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        //connect to mongoose
        mongoose.connect(DB_URL, { useNewUrlParser: true });
    };
    Airship.prototype.configErrorHandling = function () {
        // if error is not an instanceOf ApiError, convert it.
        this.app.use(function (err, req, res, next) {
            // console.log('=====================');
            // console.log(err);
            // return;
            if (err instanceof expressValidation.ValidationError) {
                // validation error contains errors which is an array of error each containing message[]
                var unifiedErrorMessage = err.errors.map(function (error) { return error.messages.join('. '); }).join(' and ');
                var error = new error_1.ApiError(unifiedErrorMessage, err.status, true);
                return next(error);
            }
            else if (!(err instanceof error_1.ApiError)) {
                var apiError = new error_1.ApiError(err.message, err.status, err.isPublic);
                return next(apiError);
            }
            console.log('========');
            console.log(err);
            return next(err);
        });
        // console.log('========')
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            var err = new error_1.ApiError('API not found', httpStatus.NOT_FOUND);
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
        this.app.use(function (err, req, res, next) {
            return res.status(err.status).json({
                message: err.isPublic ? err.message : err.message,
                // message: err.isPublic ? err.message : httpStatus[err.status],
                stack: process.env.NODE_ENV === 'development' ? err.stack : {}
            });
        });
    };
    Airship.prototype.normalizePort = function (val) {
        var port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    };
    return Airship;
}(paper_1.Paper));
exports.Airship = Airship;
//# sourceMappingURL=airship.js.map