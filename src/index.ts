import dotenv from 'dotenv';
import express from 'express';
import userRouter from './routes/userRoutes';
import { initDB, pool } from './config/db';
import postRouter from './routes/postRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// test DB
app.get('/ping', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as now');
    res.json({ status: 'ok', time: (rows as any)[0].now });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// routes
app.use('/users', userRouter);
app.use('/posts', postRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`✅ Server listening at http://localhost:${PORT}`);
  });
})();
