"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = exports.UserController = void 0;
const user_1 = __importDefault(require("./user"));
const todos_1 = __importDefault(require("./todos"));
exports.UserController = user_1.default;
exports.TodoController = todos_1.default;
