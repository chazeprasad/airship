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
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, status, isPublic) {
        if (isPublic === void 0) { isPublic = true; }
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        _this.status = status;
        _this.isPublic = isPublic;
        _this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(_this);
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
//# sourceMappingURL=error.js.map