import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

dotenv.config();

import express from 'express';
import cors from 'cors';



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all users
app.get("/", async (req, res) => {
    const userCount = await prisma.user.count();
    res.json(
      userCount == 0
        ? "No users have been added yet."
        : "Sonme users have been added to the database."
    );
  });

;(async () => {
    app.listen(+(process.env.PORT ?? 5000), () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})();