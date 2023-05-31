import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers"; 
import abi from "./utils/Voters.json";

function VotersPortal() {
    const [adminAcc, setAdminAcc] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [voterId, setVoterId] = useState("");
    const [searchId, setSearchId] = useState("");

    const contractAddress = "0xFde041875385b30335E9Ce3AA1c3a5B1f5E7BE23";
    const contractABI = abi.abi;

    const admin = async () => {
        try{
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            const voterContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const response = await voterContract.administrator();
            console.log("Admin Account: ", response);
            setAdminAcc(response);
          }
        }catch(err){
          console.log(err);
        }
    }

    const addVoter = async () => {
        try{
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            const voterContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const response = await voterContract.addVoter(name, mobile, voterId);
            console.log("Voter Added: ", response);

            setName("");
            setMobile("");
            setVoterId("");
          }
        }catch(err){
          console.log(err);
        }
    }

    const getVoter = async () => {
        try{
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            const voterContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            const response = await voterContract.getVoter(searchId);
            console.log("Voter Details: ", response);
            setSearchId("");
          }
        }catch(err){
          console.log(err);
        }
    }

    return(
        <div className="mainContainer">
        <div className="dataContainer">
            <div className="header">
                🗳️ E-Voting
            </div>
    
            <div className="bio">
                This is a blockchain based voting campaign powered by ethereum
                Admin can add eligible voters here!
            </div>

            <button className="voteButton" onClick={admin}>
                Administrator Id
            </button>

            {adminAcc ?
            <div style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
                <div>Admin Address: {adminAcc}</div>
            </div> : null}

            <>
                <h3 className="bio">Voter Name, Mobile & VoterId</h3>
                <input type="text" className="candidateInput" value={name} onChange={(event) => setName(event.target.value)} />
                <input type="text" className="candidateInput" value={mobile} onChange={(event) => setMobile(event.target.value)} />
                <input type="text" className="candidateInput" value={voterId} onChange={(event) => setVoterId(event.target.value)} />
                <button className="voteButton" onClick={addVoter}>
                    Add Voter
                </button> 
            </>

            <>
                <h3 className="bio">Get Voter</h3>
                <input type="text" className="candidateInput" value={searchId} onChange={(event) => setSearchId(event.target.value)} />
                <button className="voteButton" onClick={getVoter}>
                    Get Voter Details
                </button> 
            </>

        </div>
        </div>
    )
}

export default VotersPortal