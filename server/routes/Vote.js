const express = require("express");
const router = express.Router();
const crypto = require('crypto');
require("dotenv").config();
const { votingInstance, account, gasPrice } = require("../contracts");

function voterIdToHash(num) {
    try{
        const hash = crypto.createHash('sha3-256').update(num.toString()).digest();
        return `0x${hash.toString('hex')}`;
    }catch(error){
       console.log(error);
    }
}
  
router.post('/vote', async(req, res) => {
    const {candidateId, voterId} = req.body;
    console.log(req.body);
    const sha3 = voterIdToHash(voterId);
    
    console.log(candidateId);
    console.log(voterId);
    console.log(sha3);

    try{
        const gasLimit = await votingInstance.methods.vote(candidateId, sha3).estimateGas(); // estimate the gas limit
        
        const transaction = {
            from: account.address,
            to: process.env.VOTING_CONTRACT,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: 0
          };

        const voterDetails = await votingInstance.methods.vote(candidateId, sha3).send(transaction);
        console.log(voterDetails);
        res.status(200).json({voterDetails});

    }catch(err){
        console.log(err);
        res.status(404).json({message: err.toString()});
    }

});

module.exports = router;