import { genSalt, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const foundUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (foundUser) {
      throw new AppError(400, 'This e-mail was already used.');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
