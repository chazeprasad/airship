"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Util");
var ROUTE_PREFIX = Util_1.Util.ROUTE_PREFIX;
function Api(args) {
    var path = Util_1.Util.DestructApiDecorator(args).path;
    var ctrlPath = Util_1.Util.DestructApiDecorator(args).path;
    return function (target) {
        var proto = target.prototype;
        proto.$routes = Object.getOwnPropertyNames(proto)
            .filter(function (prop) { return prop.indexOf(ROUTE_PREFIX) === 0; })
            .map(function (prop) {
            var _a = proto[prop], method = _a.method, path = _a.path, middlewareList = _a.middlewareList;
            var url = "" + ctrlPath + path;
            var actionName = prop.substring(ROUTE_PREFIX.length);
            return {
                method: method === 'del' ? 'delete' : method,
                url: url,
                middlewareList: middlewareList,
                actionName: actionName
            };
        });
    };
}
exports.Api = Api;
//# sourceMappingURL=ApiDecorator.js.map