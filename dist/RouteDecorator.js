"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hi() {
    return 'Hi..!!';
}
exports.hi = hi;
var Util_1 = require("./Util");
var ROUTE_PREFIX = Util_1.Util.ROUTE_PREFIX;
function route(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof method !== 'string') {
        throw new Error('The first argument must be an HTTP method');
    }
    var _a = Util_1.Util.DestructRouteDecorator(args), path = _a.path, middlewareList = _a.middlewareList;
    return function (target, name, descriptor) {
        target["" + ROUTE_PREFIX + name] = {
            method: method,
            path: path,
            middlewareList: middlewareList
        };
    };
}
var Head = route.bind(null, 'head');
exports.Head = Head;
var Options = route.bind(null, 'options');
exports.Options = Options;
var Get = route.bind(null, 'get');
exports.Get = Get;
var Post = route.bind(null, 'post');
exports.Post = Post;
var Put = route.bind(null, 'put');
exports.Put = Put;
var Patch = route.bind(null, 'patch');
exports.Patch = Patch;
var Delete = route.bind(null, 'delete');
exports.Delete = Delete;
var Del = route.bind(null, 'del');
exports.Del = Del;
var All = route.bind(null, 'all');
exports.All = All;
