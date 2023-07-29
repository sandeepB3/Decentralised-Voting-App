import { config as dotenvConfig } from 'dotenv';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import VotersABI from './utils/Voters.json';
import VotingABI from './utils/VotingPortal.json';

dotenvConfig();

const web3 = new Web3(process.env.QuickNode_URL || '');
const votersContractABI = VotersABI.abi as AbiItem[]; 
const votingContractABI = VotingABI.abi as AbiItem[];

const votingContractAddress = process.env.VOTING_CONTRACT;
const votersContractAddress = process.env.VOTER_CONTRACT;

const privateKeys: string[] = [];
for (let i = 1; i <= 3; i++) {
  const privateKey = process.env[`PRIVATE_KEY${i}`];
  if (privateKey) {
    privateKeys.push(privateKey);
  }
}

const PRIVATE_KEY = privateKeys[Math.floor(Math.random() * privateKeys.length)];

const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const votersInstance = new web3.eth.Contract(votersContractABI, votersContractAddress);
const votingInstance = new web3.eth.Contract(votingContractABI, votingContractAddress);

let gasPrice: string | undefined;

async function getGas() {
  try {
    gasPrice = await web3.eth.getGasPrice(); // get the current gas price
  } catch (err) {
    console.log(err);
  }
}

getGas();

export { votersInstance, votingInstance, account, gasPrice };
