import { Router } from 'express';

import usersRouter from './users.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Server working!' });
});

routes.use('/users', usersRouter);

export default routes;
