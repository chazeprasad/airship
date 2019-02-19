"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var TodoController_1 = require("./TodoController");
var todo = new TodoController_1.TodoController();
app.use('/', todo.router);
exports.default = app;
