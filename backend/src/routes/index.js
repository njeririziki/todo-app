"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = exports.UserRoutes = void 0;
const user_1 = __importDefault(require("./user"));
const todos_1 = __importDefault(require("./todos"));
exports.UserRoutes = user_1.default;
exports.TodoRoutes = todos_1.default;
