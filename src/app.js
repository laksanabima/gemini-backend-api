import express from 'express';
import { port } from './config/index.js';
import generateRoutes from './routes/generate.js';

const app = express();

app.use(express.json());
app.use('/', generateRoutes);

app.listen(port, () => console.log(`Server ready on http://localhost:${port}`));

export default app;
