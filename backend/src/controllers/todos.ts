import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TodoController {
   
   

    static async getTodo(req: Request, res: Response) {
 
        try {
            const todos = await prisma.todo.findMany();
            res.status(200).json(todos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createTodo(req: Request, res: Response) {
        try {
            const newTodo = await prisma.todo.create(req.body);
            res.status(201).json(newTodo);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateTodo(req: Request, res: Response) {
        try {
            const updatedTodo = await prisma.todo.update({
                where: { id: Number(req.params.id) },
                data: req.body
            });
            if (updatedTodo) {
                res.status(200).json(updatedTodo);
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteTodo(req: Request, res: Response) {
        try {
            const deleted = await prisma.todo.delete({
                where: { id: Number(req.params.id) }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default TodoController;