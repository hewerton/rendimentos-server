/* eslint-disable simple-import-sort/sort */

// database connection
import './database';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';

import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// built-ins middlewares
app.use(express.json());

// third party middlewares
app.use(helmet());
app.use(cors());

// routes
app.use(routes);
app.use(errorHandler);

export default app;
