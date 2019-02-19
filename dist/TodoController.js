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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActionController_1 = require("./ActionController");
var RouteDecorator_1 = require("./RouteDecorator");
var ApiDecorator_1 = require("./ApiDecorator");
function setValue(req, res, next) {
    req.user = 'prasad';
    next();
}
var TodoController = /** @class */ (function (_super) {
    __extends(TodoController, _super);
    function TodoController() {
        return _super.call(this) || this;
    }
    TodoController.prototype.getTodo = function (req, res, next) {
        console.log(req.user);
        res.json({ user: req.user });
    };
    __decorate([
        RouteDecorator_1.Get('/', [setValue]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], TodoController.prototype, "getTodo", null);
    TodoController = __decorate([
        ApiDecorator_1.Api('/todo'),
        __metadata("design:paramtypes", [])
    ], TodoController);
    return TodoController;
}(ActionController_1.ActionController));
exports.TodoController = TodoController;
