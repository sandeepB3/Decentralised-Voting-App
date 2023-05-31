const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const cors = require('cors');
require('dotenv').config();

const otpAuth = require('./routes/OtpAutherization');
const voterAuth = require('./routes/VoterAuth');
const votingStatus = require('./routes/VotingStatus');
const candidateList = require('./routes/CandidateList');
const vote = require('./routes/Vote');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(otpAuth);
app.use(voterAuth);
app.use(votingStatus);
app.use(candidateList);
app.use(vote);

app.get('/',(req,res) =>{
    res.send('This is index.js');
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})

