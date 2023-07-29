import express, { Request, Response, Router } from 'express';
import { votingInstance } from '../contracts';

const router: Router = express.Router();

router.get('/candidateList', async (req: Request, res: Response) => {
  try {
    const candidates = await votingInstance.methods.showAllCandidate().call();
    res.status(200).json({ candidates });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'Error getting candidate list' });
  }
});

router.get('/winner', async (req: Request, res: Response) => {
  try {
    const winner = await votingInstance.methods.winnerName().call();
    console.log(winner);
    res.status(200).json({ winner });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.toString() });
  }
});

export default router;
