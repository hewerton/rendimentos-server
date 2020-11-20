import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import Entry from '../models/Entry';
import CreateEntryService from '../services/CreateEntryService';

const entriesRouter = Router();

entriesRouter.use(ensuredAuthenticated);

entriesRouter.get('/', async (request, response) => {
  const entryRepository = getRepository(Entry);
  const { id: userId } = request.user;
  const entries = await entryRepository.find({
    where: {
      userId,
    },
  });

  return response.json(entries);
});

entriesRouter.post('/', async (request, response) => {
  const {
    ticker,
    quantity,
    value,
    taxes,
    date,
    wallet_id: walletId,
  } = request.body;

  const createEntry = new CreateEntryService();

  const entry = await createEntry.execute({
    ticker,
    quantity,
    value,
    taxes,
    date,
    userId: request.user.id,
    walletId: null || walletId,
  });

  return response.json(entry);
});

export default entriesRouter;
