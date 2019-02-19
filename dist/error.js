"use strict";
// import * as httpStatus from 'http-status'
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
/**
 * @extends Error
 */
var ApplicationError = /** @class */ (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(message, status, isPublic) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        _this.status = status;
        _this.isPublic = isPublic;
        _this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(_this);
        return _this;
    }
    return ApplicationError;
}(Error));
exports.ApplicationError = ApplicationError;
/**
 * Class representing an API error.
 * @extends ExtendableError
 */
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    function ApiError(message, status, isPublic) {
        if (status === void 0) { status = 500; }
        if (isPublic === void 0) { isPublic = false; }
        return _super.call(this, message, status, isPublic) || this;
    }
    return ApiError;
}(ApplicationError));
exports.ApiError = ApiError;
//# sourceMappingURL=error.js.map