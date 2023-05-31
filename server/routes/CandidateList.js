const express = require("express");
const router = express.Router();
require("dotenv").config();
const { votingInstance } = require("../contracts");

router.get('/candidateList', async(req, res) => {
    try{
        const candidates = await votingInstance.methods.showAllCandidate().call();
        res.status(200).json({candidates});

    }catch(err){
        console.log(err);
        res.status(404).json({message: 'Error getting candidate list'});
    }
});

router.get('/winner', async(req, res) => {
    try{
        const winner = await votingInstance.methods.winnerName().call();
        console.log(winner);
        res.status(200).json({winner});

    }catch(err){
        console.log(err);
        res.status(404).json({message: err.toString()});
    }
});


module.exports = router;