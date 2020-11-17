import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app = express();

// built-ins middlewares
app.use(express.json());

// third party middlewares
app.use(helmet());
app.use(cors());

// routes
app.use(routes);

export default app;
