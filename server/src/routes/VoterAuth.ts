import express, { Request, Response, Router } from 'express';
import { config as dotenvConfig } from 'dotenv';
import { votersInstance, account, gasPrice } from '../contracts';

dotenvConfig();

const router: Router = express.Router();

router.post('/voterAuth', async (req: Request, res: Response) => {
  const { voterId } = req.body;
  try {
    const voterDetails = await votersInstance.methods.getVoter(voterId).call();

    if (voterDetails.name) {
      console.log(voterDetails);
      res.status(200).json({ voterDetails });
    } else {
      res.status(404).json({ message: 'Voter not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

router.post('/updateVoter', async (req: Request, res: Response) => {
  const { voterId } = req.body;

  try {
    const gasLimit = await votersInstance.methods.updateVoter(voterId).estimateGas(); // estimate the gas limit
    const transaction = {
      from: account.address,
      to: process.env.VOTING_CONTRACT as string,
      gasPrice: gasPrice as string,
      gasLimit: gasLimit,
      value: 0,
    };

    const voterStatus = await votersInstance.methods.updateVoter(voterId).send(transaction);
    console.log(voterStatus);
    res.status(200).json({ voterStatus });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
});

export default router;
