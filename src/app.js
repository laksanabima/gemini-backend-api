import express from 'express';
import multer from 'multer';
import { port } from './config/index.js';
import { apiKeyAuth } from './middlewares/apiKey.js';
import generateRoutes from './routes/generate.js';

const app = express();

app.use(express.json());
app.use(apiKeyAuth);
app.use('/', generateRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File terlalu besar (maks 20MB)' });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
});

app.listen(port, () => console.log(`Server ready on http://localhost:${port}`));

export default app;
