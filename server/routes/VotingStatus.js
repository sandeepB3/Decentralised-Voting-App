const express = require("express");
const router = express.Router();
require("dotenv").config();
const { votingInstance } = require("../contracts");

router.get('/votingStatus', async(req, res) => {
    try{
        const votingStarted = await votingInstance.methods.EnableVoting().call();
        const votingEnded = await votingInstance.methods.DisableVoting().call();

        console.log(votingStarted, votingEnded);
        res.status(200).json({votingStarted, votingEnded});

    }catch(err){
        console.log(err);
        res.status(404).json({message: 'Error finding voting status'});
    }
});

module.exports = router;
