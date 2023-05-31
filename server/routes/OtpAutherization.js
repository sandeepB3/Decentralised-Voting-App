require("dotenv").config();
const express = require("express");
const router = express.Router();

const accountSid = process.env.TWILIO_ACC_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_ID
const client = require("twilio")(accountSid, authToken);


router.post('/otpAuth', async(req, res)=> {

    try {
        console.log(req.body.mobileNumber);
        const {mobileNumber} = req.body;

        await client.verify.v2.services(verifySid)
        .verifications
        .create({to: '+91'+mobileNumber, channel: 'sms'})
        .then(verification =>  {
            console.log(verification.status)
            res.send(verification.status)
        })

    }catch(e){
        res.status(500).json({error: e.message});
    }    

});

router.post('/otpVerify', async(req, res) => {
    try{
        console.log('Waiting for OTP')
        const {mobileNumber, otp} = req.body;
        console.log(otp);

        await client.verify.v2.services(verifySid)
        .verificationChecks
        .create({to: '+91'+mobileNumber, code: otp})
        .then(verification_check => {
            console.log(verification_check.status)
            res.send(verification_check.status)
        });

    }catch(e){
        res.status(500).json({error: e.message});
    }
})


module.exports = router;
