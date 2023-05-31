# Decentralised Voting App

A smartphone based voting app using blockchain technology. Allows pre-registered users to login via OTP verification and vote registered candidates.
## Features

- OTP Verification
- Fingerprint authenticated Voting
- Realtime Voting Status
- Deployed Public Contracts


## API Reference

#### Twilio API

Required API Parameters - [Refer Documentation](https://www.twilio.com/docs/verify/api)
```http
  client.verify.v2.services
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accountSid` | `string` | Account Service Id |
| `verifySid` | `string` | Verify Service Id |
| `authToken` | `string` | Your API Key |

**Refer the above documentation for code snippets and example response**

#### QuickNode API

Used for spinning up your own [Ethereum Node](https://www.quicknode.com/endpoints)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `HTTP Provider`      | `URL` | API Endpoint |

**Go to [quicknode.com](https://www.quicknode.com/) to set up your own sepolia endpoint or your prefered endpoint**

#### [MetaMask](https://docs.metamask.io/) Private Key

Setup your MetaMask Wallet to get your Private Keys and add some test ethers in the Sepolia network or your prefered network

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in respective Folders

**Folder: server**

`TWILIO_AUTH_TOKEN`

`TWILIO_ACC_ID`

`TWILIO_VERIFY_ID`

`QuickNode_URL`

`PRIVATE_KEY1`

`VOTING_CONTRACT`

`VOTER_CONTRACT`

---
**Folder: voter-contract & voting-contract**

`QUICKNODE_KEY`

`PRIVATE_KEY`

**All the above API tokens and private keys can be obtained by following the API reference guides**

`VOTING_CONTRACT` & `VOTER_CONTRACT` can be put once you deploy your contract.

`QUICKNODE_KEY` & `QuickNode_URL` are one and the same

`PRIVATE_KEY` obtained by setting up a metamask wallet
## Run Locally

Clone the project

```bash
  git clone https://github.com/sandeepB3/Decentralised-Voting-App.git
```

Open 5 terminals and go to the each of the project directories 

```bash
  cd server
  cd voter-contract
  cd voting-contract
  cd voting-App
  cd voting-portal
```

Install dependencies in all

```bash
  npm install
```

### Step 1: Deploying Contracts
Create .env file in voter-contract & voting-contract folder & fill the env variables as stated above

```bash
  touch .env
```
Once you have setup the two enviorment variables deploy both the contract in both folders

```bash
  npx hardhat run scripts/deploy.js --network sepolia
```
### Step 2: Setup your voting-portal web app
Inside the voting-portal folder change the value of contractAddress variable inside `VotersPortal.js` & `VotingPortal.js` to the new deployed contractAddressess

Similarly change the contents of `Voters.json` & `VotingPortal.json` inside the utils folder to the new contract ABI's present inside artifacts folder of voter-contract & voting-contract folder.

Start the Client

```bash
  npm start
```

### Step 3: Setup your server
Create .env file in server folder & fill the env variables as stated above

```bash
  touch .env
```
Once you have setup the two enviorment variables run the server

```bash
  nodemon index.js
```

### Step 4: Start your voting App

Start Client and scan the expo QR code using expo app

```bash
  npm start
```
## Tech Stack

**Client:** React, react-router, Redux, React Native, Expo, Axios, Ethers.js

**Server:** Node.js, Express.js, Web3.js

**Blockchain:** Solidity, Hardhat, Sepolia

**Tools:** Metamask, QuickNode, Twilio
## Screenshots

The below Screenshots shows the outputs of the step by step proccess flow

### Deploying Contracts
<div align="center">
  <img width="838" alt="Screenshot 2023-05-31 at 9 39 34 PM" src="https://github.com/sandeepB3/Decentralised-Voting-App/assets/107111616/8165162a-2afd-4713-84a0-31edab9bf637">
</div>

### Admin - User Interface
<div align="center">
  <img width="735" alt="Screenshot 2023-05-31 at 9 39 42 PM" src="https://github.com/sandeepB3/Decentralised-Voting-App/assets/107111616/13178c08-ce8e-4415-b230-4363218afaf1">
</div>

### Client Application - Login & Verification
<div align="center">
  <img width="341" alt="Screenshot 2023-05-31 at 9 40 01 PM" src="https://github.com/sandeepB3/Decentralised-Voting-App/assets/107111616/63388de0-0149-4d8b-9bf6-3cdc29dd88d5">
</div>

### Client Application - Casting Votes
<div align="center">
  <img width="305" alt="Screenshot 2023-05-31 at 9 40 13 PM" src="https://github.com/sandeepB3/Decentralised-Voting-App/assets/107111616/6f1dfe27-3adf-4c23-acb1-7076bc605b41">
</div>

### Client Application - Profile & Result Screen
<div align="center">
  <img width="410" alt="Screenshot 2023-05-31 at 9 40 32 PM" src="https://github.com/sandeepB3/Decentralised-Voting-App/assets/107111616/3799a9dd-92ba-4659-99d6-c53b6b175672">
</div>

## Future Scope
- Improving Transaction Speed with Solana Backend
- Scalability using cloud platforms (AWS)
- Implementing Advanced Security Measure
- Improved UI & UX

