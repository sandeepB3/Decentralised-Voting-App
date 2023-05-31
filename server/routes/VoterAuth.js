const express = require("express");
const router = express.Router();
require("dotenv").config();
const { votersInstance, account, gasPrice } = require("../contracts");

router.post('/voterAuth', async(req, res) => {
    const { voterId } = req.body;
    try{
        const voterDetails = await votersInstance.methods.getVoter(voterId).call();

        if(voterDetails.name){
            console.log(voterDetails);
            res.status(200).json({voterDetails});
        }else{
            res.status(404).json({message: 'Voter not found'});
        }

    }catch(err){
        console.log(err);
    }
});

router.post('/updateVoter', async(req, res) => {
    const { voterId } = req.body;

    try{
        const gasLimit = await votersInstance.methods.updateVoter(voterId).estimateGas(); // estimate the gas limit
        const transaction = {
            from: account.address,
            to: process.env.VOTING_CONTRACT,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            value: 0
          };

        const voterStatus = await votersInstance.methods.updateVoter(voterId).send(transaction);
        console.log(voterStatus);
        res.status(200).json({voterStatus});

    }catch(err){
        console.log(err);
        res.status(404).json({message: err.toString()});
    }

})

module.exports = router;
