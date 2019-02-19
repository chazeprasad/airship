"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.DestructRouteDecorator = function (args) {
        if (args.length === 0) {
            throw new Error('Missing Route path');
        }
        if ((typeof args !== 'string') && typeof args[0] !== 'string') {
            throw new Error('Route path must be string');
        }
        var list = (args.length > 1) ? args[1] : [];
        var path = (typeof args !== 'string') ? args[0] : args;
        console.log('list');
        console.log(typeof args);
        console.log(list);
        console.log('args');
        console.log(args);
        return { path: path, middlewareList: list };
    };
    Util.DestructBeforeActionDecorator = function (args) {
        if (args.length === 0) {
            throw new Error('Missing Before Action List');
        }
        var list = args;
        if (list.some(function (m) { return typeof m !== 'function'; })) {
            throw new Error('Before action must be function');
        }
        return { actionList: list };
    };
    Util.DestructApiDecorator = function (args) {
        if (args.length === 0) {
            throw new Error('Missing Route path');
        }
        if ((typeof args !== 'string') && (typeof args[0] !== 'string')) {
            throw new Error('Route path must be string');
        }
        var path = (typeof args !== 'string') ? args[0] : args;
        return { path: path };
    };
    Util.ROUTE_PREFIX = '$$route_';
    return Util;
}());
exports.Util = Util;
