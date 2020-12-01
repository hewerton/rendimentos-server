import { getRepository } from 'typeorm';

import Wallet from '../models/Wallet';

interface Request {
  title: string;
  userId: string;
}

class CreateWalletService {
  public async execute({ title, userId }: Request): Promise<Wallet> {
    const walletsRepository = getRepository(Wallet);

    const wallet = walletsRepository.create({ title, userId });
    await walletsRepository.save(wallet);

    return wallet;
  }
}

export default CreateWalletService;
