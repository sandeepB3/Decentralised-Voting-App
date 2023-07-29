import express, { Request, Response, Router } from 'express';
import { config as dotenvConfig } from 'dotenv';
import { votingInstance } from '../contracts';

dotenvConfig();

const router: Router = express.Router();

router.get('/votingStatus', async (req: Request, res: Response) => {
  try {
    const votingStarted = await votingInstance.methods.EnableVoting().call();
    const votingEnded = await votingInstance.methods.DisableVoting().call();

    console.log(votingStarted, votingEnded);
    res.status(200).json({ votingStarted, votingEnded });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Error finding voting status' });
  }
});

export default router;
