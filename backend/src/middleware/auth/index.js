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
exports.EnsureIsAunthenticated = EnsureIsAunthenticated;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function EnsureIsAunthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header('x-access-token')) === null || _a === void 0 ? void 0 : _a.toString().trim();
            if (!token) {
                throw new Error('Unauthorized');
            }
            // @ts-ignore
            const { email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield prisma.user.findUniqueOrThrow({
                where: {
                    email
                }
            });
            // @ts-ignore
            req.user = user;
            req.user = user;
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    });
}
