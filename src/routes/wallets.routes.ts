import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensuredAuthenticated from '../middlewares/ensureAuthenticated';
import Wallet from '../models/Wallet';
import CreateWalletService from '../services/CreateWalletService';

const walletsRouter = Router();

walletsRouter.use(ensuredAuthenticated);

walletsRouter.get('/', async (request, response) => {
  const { id: userId } = request.user;
  const walletsRepository = getRepository(Wallet);

  const wallets = await walletsRepository.find({
    where: {
      userId,
    },
  });

  return response.json(wallets);
});

walletsRouter.post('/', async (request, response) => {
  const { id: userId } = request.user;
  const { title } = request.body;

  const createWallet = new CreateWalletService();
  const wallet = await createWallet.execute({ title, userId });

  return response.json(wallet);
});

export default walletsRouter;
