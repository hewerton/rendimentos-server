import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Entry from '../models/Entry';

interface Request {
  ticker: string;
  quantity: number;
  value: number;
  taxes: number;
  date: Date;
  walletId: string | null;
  userId: string;
}
class CreateEntryService {
  public async execute({
    ticker,
    quantity,
    value,
    taxes,
    date,
    userId,
    walletId,
  }: Request): Promise<Entry> {
    if (!userId) {
      throw new AppError(401, 'User id is missing');
    }

    const entryRepository = getRepository(Entry);
    const entry = entryRepository.create({
      ticker,
      quantity,
      value,
      taxes,
      date,
      userId,
      walletId,
    });

    await entryRepository.save(entry);

    return entry;
  }
}

export default CreateEntryService;
