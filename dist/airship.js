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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.configureMiddleware()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.configErrorHandling()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Airship.prototype.configureMiddleware = function () {
        return __awaiter(this, void 0, void 0, function () {
            var corsOptions;
            return __generator(this, function (_a) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                if (process.env.NODE_ENV === 'development') {
                    this.app.use(logger('dev'));
                }
                // Public directory
                this.app.use(express.static(this.staticDir));
                // secure apps by setting various HTTP headers
                this.app.use(helmet());
                corsOptions = {
                    "origin": "*",
                    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
                    "preflightContinue": false,
                    "optionsSuccessStatus": 200
                };
                // this.app.options('*', cors(corsOptions))
                this.app.use(cors(corsOptions));
                this.initFileUpload();
                // await this.initMongoose();
                this.app.use(bodyParser.json());
                this.app.use(bodyParser.urlencoded({
                    extended: true
                }));
                this.app.use(cookieParser());
                this.app.use(compress());
                this.app.use(methodOverride());
                this.app.use(function (req, res, next) {
                    req.context = {};
                    next();
                });
                // enable detailed API logging in dev env
                if (process.env.NODE_ENV === 'development') {
                    expressWinston.requestWhitelist.push('body');
                    expressWinston.responseWhitelist.push('body');
                }
                return [2 /*return*/];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var DB_URL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        DB_URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/paperboat';
                        //use q promises
                        global.Promise = require("q").Promise;
                        mongoose.Promise = global.Promise;
                        //connect to mongoose
                        return [4 /*yield*/, mongoose.connect(DB_URL, { useNewUrlParser: true })];
                    case 1:
                        //connect to mongoose
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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