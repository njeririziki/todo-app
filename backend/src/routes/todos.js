"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// @ts-ignore/
router.use('/', auth_1.EnsureIsAunthenticated);
router.post('/', controllers_1.TodoController.createTodo);
router.get('/', controllers_1.TodoController.getTodo);
router.put('/:id', controllers_1.TodoController.updateTodo);
router.delete('/:id', controllers_1.TodoController.deleteTodo);
exports.default = router;
