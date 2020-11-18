import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../config/authConfig';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(401, 'Incorrect email/password combination');
    }

    const checkedPassword = await compare(password, user.password);

    if (!checkedPassword) {
      throw new AppError(401, 'Incorrect email/password combination');
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
