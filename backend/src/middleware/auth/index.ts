import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function EnsureIsAunthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('x-access-token')?.toString().trim();

        if (!token) {
            throw new Error('Unauthorized');
        }

        // @ts-ignore
        const { email } = jwt.verify(token, process.env.JWT_SECRET) as { email: string };
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email
            }
        })

        // @ts-ignore
        req.user = user;
        (req as any).user = user;
        return next();
    } catch (error: any) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
// import { NextFunction } from "express";
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function EnsureIsAunthenticated(req: Request, res: Response, next: NextFunction) {
//     try {
//         // @ts-ignore
//         const token = req.header('x-access-token')?.trim();

//         if (!token) {
//             throw new Error('Unauthorized');
//         }

//         // @ts-ignore
//         const { email } = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await prisma.user.findUniqueOrThrow({
//             where: {
//                 email
//             }
//         })

//         // @ts-ignore
//         req.user = user;
//         return next();
//     } catch (error: any) {
//         // @ts-ignore
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// }