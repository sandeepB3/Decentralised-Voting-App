// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract VotingPortal {

    struct Voter {
        bool voted;
        string vote;
    }
    mapping(bytes32 => Voter) public voters;

    struct Candidate {
        string name;
        uint voteCount;
    }
    Candidate[] public candidates;

    address public administrator;
    bool public EnableVoting;
    bool public DisableVoting;

    event CandidateRecorded(string candidateName);
    event VotingStatus(bool status);
    event VoteRecorded(uint candidateIndex, bytes32 _voterId);
    
    constructor(string[] memory candidateNames) {
        administrator = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
        console.log("Administrator: %s", administrator);
    }

    modifier onlyAdmin() {
        require(msg.sender == administrator, "Only the admin can call this function");
        _;
    }

    function addCandidate(string memory candidateName) public onlyAdmin {
        require(!EnableVoting, "The portal is not accepting anymore candidates");
        candidates.push(Candidate({
            name: candidateName,
            voteCount: 0
        }));
        emit CandidateRecorded(candidateName);
    }

    function StartVoting() public onlyAdmin { 
        EnableVoting = true; 
        emit VotingStatus(EnableVoting);
        console.log("\nVoting has started");
    }

    function showAllCandidate() public view returns (Candidate[] memory) {
        return candidates;
    }

    function vote(uint candidateIndex , bytes32 _voterId) external {
        Voter storage sender = voters[_voterId];
        // require(EnableVoting && !DisableVoting, "Voting Portal is closed");
        require(!sender.voted, "VoterID already voted.");

        sender.voted = true;

        if(candidateIndex < candidates.length && candidateIndex != 0){
            sender.vote = candidates[candidateIndex].name;
            candidates[candidateIndex].voteCount++;
        }else{
            sender.vote = candidates[0].name;
            candidates[0].voteCount++;
        }
        emit VoteRecorded(candidateIndex, _voterId);
    }

    function winningCandidate() internal view returns (uint _winningCandidateIndex){
        uint winningVoteCount = 0;
        for (uint c = 0; c < candidates.length; c++) {
            if (candidates[c].voteCount > winningVoteCount) {
                winningVoteCount = candidates[c].voteCount;
                _winningCandidateIndex = c;
            }
        }
    }

    function winnerName() public view returns (string memory _winnerName){
        // require(EnableVoting, "Voting is not yet started");
        // require(DisableVoting, "Voting is still in progress");
        _winnerName = candidates[winningCandidate()].name;
    }

    function FinishVoting() public onlyAdmin {
        DisableVoting = true;
        emit VotingStatus(DisableVoting);
        console.log("\nVoting has stopped");
    }
}