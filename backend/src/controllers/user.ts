import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();

const prisma = new PrismaClient();
class UserController {

    // returns an authtoken
    static async createUser(req: Request, res: Response) {
        try {
            const { username} = req.body;
            const user = await prisma.user.upsert({
                where: {
                    email: username
                },
                update: {},
                create: {
                    email: username,
                    
                }
            });
      
           const token = jwt.sign(user , process.env.JWT_SECRET as string, { expiresIn: '3h' });
              
            res.status(201).json({ token });
        } catch (error) {
            
                res.status(500).json({ message: 'Internal Server Error' });     
  
        }
    }
}

export default UserController;
