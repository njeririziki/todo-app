import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
class UserController {

    // returns an authtoken
    static async createUser(req: Request, res: Response) {
        try {
            const { username} = req.body;
            const authToken = await prisma.user.create({
                data: {
                    email: username,
                    
                }
            });
            res.status(201).json({ authToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default UserController;
