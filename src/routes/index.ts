import { Router } from 'express';

import entriesRouter from './entries.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Server working!' });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/entries', entriesRouter);

export default routes;
