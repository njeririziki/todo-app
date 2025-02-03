"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class TodoController {
    static getTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.header("x-access-token")) === null || _a === void 0 ? void 0 : _a.toString().trim();
                if (!token) {
                    throw new Error("Unauthorized");
                }
                const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const { id } = decodedToken;
                const search = req.query.search;
                const todos = search
                    ? yield prisma.todo.findMany({
                        where: {
                            ownerId: Number(id),
                            AND: [
                                {
                                    OR: [
                                        { title: { contains: search, mode: "insensitive" } },
                                        { description: { contains: search, mode: "insensitive" } },
                                    ],
                                },
                            ],
                        },
                    })
                    : yield prisma.todo.findMany({
                        where: { ownerId: Number(id) },
                    });
                res.status(200).json(todos);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static createTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTodo = yield prisma.todo.create({
                    data: req.body,
                });
                res.status(201).json(newTodo);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static updateTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTodo = yield prisma.todo.update({
                    where: { id: Number(req.params.id) },
                    data: req.body,
                });
                if (updatedTodo) {
                    res.status(200).json(updatedTodo);
                }
                else {
                    res.status(404).json({ message: "Todo not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield prisma.todo.delete({
                    where: { id: Number(req.params.id) },
                });
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: "Todo not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = TodoController;
