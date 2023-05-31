import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers"; 
import abi from "./utils/VotingPortal.json";

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
  
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }
    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.log("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};


function VotingPortal() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [adminAcc, setAdminAcc] = useState("");
  const [candidate, setCandidate] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  const [votingStarted, setVotingStarted] = useState(false);
  const [votingStopped, setVotingStopped] = useState(false);
  const [winner, setWinner] = useState("");

  const contractAddress = "0xB4Ea11292CDEC20B9b0D68B9504B8D3ebb55b660";
  const contractABI = abi.abi;
  
  useEffect(() => {
    async function getWallet() {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        setCurrentAccount(account);
      }
    }

    async function started () {
      try{
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
          const response = await votePortalContract.EnableVoting();
          console.log("Voting start status: ", response);
          setVotingStarted(response);
        }
      }catch(err){
        console.log(err);
      }
    }

    async function stopped () {
      try{
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
          const response = await votePortalContract.DisableVoting();
          console.log("Voting stop status: ", response);
          setVotingStopped(response);
        }
      }catch(err){
        console.log(err);
      }
    }

    getWallet();
    started();
    stopped();

  },[contractABI]);

  window.ethereum.on('accountsChanged', (accounts)=>{
    console.log("Changed account", accounts[0]);
    setCurrentAccount(accounts[0]);
  });

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(accounts);
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  //Admin Functions
  //1. administrator
  //2. addCandidate
  //3. displayAllCandidate
  //5. Start Voting
  //6. Stop Voting

  const admin = async () => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const response = await votePortalContract.administrator();
        console.log("Admin Account: ", response);
        setAdminAcc(response);
      }
    }catch(err){
      console.log(err);
    }
  }

  const addCandidate = async () => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const response = await votePortalContract.addCandidate(candidate);
        console.log("Candidate Added: ", response);
        setCandidate("");
      }
    }catch(err){
      console.log(err);
    }
  }

  const displayCandidates =  async() => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const response = await votePortalContract.showAllCandidate();
        console.log("Candidate List: ", response);

        let candidateCleaned = []

        response.forEach(candidate => {
          candidateCleaned.push({
            name: candidate.name,
            votes: candidate.voteCount
          })
        });
        setCandidateList(candidateCleaned)
      }
    }catch(err){
      console.log(err);
    }
  }

  const startVoting = async() => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const response = await votePortalContract.StartVoting();
        console.log("Voting Started: ", response);
        setVotingStarted(true);
      }
    }catch(err){
      console.log(err);
    }
  }

  const stopVoting = async() => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const response = await votePortalContract.FinishVoting();
        console.log("Voting Stopped: ", response);
        setVotingStopped(true);
      }
    }catch(err){
      console.log(err);
    }
  }

  const findWinner = async() => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider);
        const signer = provider.getSigner();
        console.log(signer);
        const votePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        displayCandidates();
        const response = await votePortalContract.winnerName();
        console.log("Winner name: ", response);
        setWinner(response);
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          🗳️ E-Voting
        </div>

        <div className="bio">
          This is a blockchain based voting campaign powered by ethereum
          Admin can connect their wallet and add eligible candidates!
        </div>

        {!currentAccount && (
          <button className="voteButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        <button className="voteButton" onClick={admin}>
          Administrator Id
        </button>

        {adminAcc ?
        <div style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
            <div>Admin Address: {adminAcc}</div>
        </div> : null}

        {!votingStarted && <> <h3 className="bio">Candidate Name</h3>
        <input type="text" className="candidateInput" value={candidate} onChange={(event) => setCandidate(event.target.value)} />
        <button className="voteButton" onClick={addCandidate}>
          Add Candidate
        </button> </>
      }

        <button className="voteButton" onClick={displayCandidates}>
          Display All Candidates 
        </button>

        {candidateList.map((candidate, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Candidate Name: {candidate.name}</div>
              <div>Vote Count: {candidate.votes.toString()}</div>
            </div>)
        })}

        {!votingStarted && 
        <button className="voteButton" onClick={startVoting}>
          Start Voting
        </button>}

        {votingStarted && !votingStopped &&
        <button className="voteButton" onClick={stopVoting}>
          Finish Voting
        </button>}

        {votingStarted && 
        <div style={{marginBottom: "150px", textAlign: 'center'}}>
          <button className="winner" onClick={findWinner}>
            Announce Winner
          </button>

          {winner &&
          <div style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Winner Name: {winner}</div>
          </div> }
        </div>
        }

      </div>
    </div>
    <footer className="footer">
    </footer>
  </>
  );
};

export default VotingPortal;