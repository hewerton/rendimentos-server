import { Router } from 'express';
import { getRepository } from 'typeorm';

import Entry from '../models/Entry';
import CreateEntryService from '../services/CreateEntryService';

const entriesRouter = Router();

entriesRouter.get('/', async (request, response) => {
  const entryRepository = getRepository(Entry);
  const entries = await entryRepository.find();
  console.log(entries[0].user);
  return response.json(entries);
});

entriesRouter.post('/', async (request, response) => {
  const {
    ticker,
    quantity,
    value,
    taxes,
    date,
    user_id: userId,
    wallet_id: walletId,
  } = request.body;

  const createEntry = new CreateEntryService();

  const entry = await createEntry.execute({
    ticker,
    quantity,
    value,
    taxes,
    date,
    userId,
    walletId: null || walletId,
  });

  return response.json(entry);
});

export default entriesRouter;
