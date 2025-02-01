import dotenv from 'dotenv';
import findConfig from 'find-config';

dotenv.config();

import express from 'express';
import cors from 'cors';

import { UserRoutes, TodoRoutes } from './routes';



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', TodoRoutes);
app.use('/users', UserRoutes);

app.use('*', async (req, res) => {
    res.status(404).json({ error: 'Not Found' });
})

;(async () => {
    app.listen(+(process.env.PORT ?? 5000), () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})();