import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import otpAuth from './routes/OtpAutherization';
import voterAuth from './routes/VoterAuth';
import votingStatus from './routes/VotingStatus';
import candidateList from './routes/CandidateList';
import vote from './routes/Vote';

dotenv.config();
const app: Application = express();
const port: number = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(otpAuth);
app.use(voterAuth);
app.use(votingStatus);
app.use(candidateList);
app.use(vote);

app.get('/', (req: Request, res: Response) => {
  res.send('This is index.js');
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
