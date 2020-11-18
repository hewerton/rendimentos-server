import { Router } from 'express';

import entriesRouter from './entries.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Server working!' });
});

routes.use('/users', usersRouter);
routes.use('/entries', entriesRouter);

export default routes;
