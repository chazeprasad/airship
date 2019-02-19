"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var Paper = /** @class */ (function () {
    function Paper() {
        this.name = this.constructor.name;
        this.log = debug(this.name + "::LOG");
        debug.enable(this.name + "::LOG");
    }
    return Paper;
}());
exports.Paper = Paper;
