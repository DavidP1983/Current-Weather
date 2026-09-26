import cors from 'cors';
import express from 'express';
import weatherRouter from './routes/weatherRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', weatherRouter);

export default app;
