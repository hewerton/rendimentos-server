import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

export default usersRouter;
