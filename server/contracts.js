require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(process.env.QuickNode_URL);
const VotersABI = require("./utils/Voters.json");
const VotingABI = require("./utils/VotingPortal.json");

const votersContractABI = VotersABI.abi;
const votingContractABI = VotingABI.abi;

const votingContractAddress = "0xB4Ea11292CDEC20B9b0D68B9504B8D3ebb55b660";
const votersContractAddress = "0xFde041875385b30335E9Ce3AA1c3a5B1f5E7BE23";

const PK = [];
for(let i = 1; i <= 3; i++){
    const pkey = process.env[`PRIVATE_KEY${i}`];
    if(pkey){
       PK.push(pkey);
    }
}

const PRIVATE_KEY = PK[Math.floor(Math.random() * PK.length)];

const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const votersInstance = new web3.eth.Contract(votersContractABI, votersContractAddress);
const votingInstance = new web3.eth.Contract(votingContractABI, votingContractAddress);

let gasPrice;

async function getGas(){
    try{
        gasPrice = await web3.eth.getGasPrice(); // get the current gas price
    }catch(err){
        console.log(err);
    }
}
getGas();

module.exports = {votersInstance, votingInstance, account, gasPrice};