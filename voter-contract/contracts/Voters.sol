// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract Voters {

    struct Voter {
        string name;
        string mobile;
        uint16 voterId;
        bool voted;
    }
    mapping(uint16 => Voter) public voter;

    address public administrator;

    event VoterStatus(Voter voter);
    event NewVoter(string voterName, string voterMobile, uint16 voterId);

    constructor(uint16[] memory voterIds, string[] memory names, string[] memory mobileNums){
        administrator = msg.sender;
        for (uint i = 0; i < voterIds.length; i++) {
            Voter storage sender = voter[voterIds[i]];
            sender.name = names[i];
            sender.mobile = mobileNums[i];
            sender.voterId = voterIds[i];
        }
        console.log("Voters Constract Deployed");
    }

    modifier onlyAdmin() {
        require(msg.sender == administrator, "Only the admin can call this function");
        _;
    }

    function getVoter(uint16 _voterId) public view returns(Voter memory){
        return voter[_voterId];
    }

    function updateVoter(uint16 _voterId) external {
        voter[_voterId].voted = true;
        emit VoterStatus(voter[_voterId]);
    }

    function addVoter(string memory voterName, string memory voterMobile, uint16 voterId) external onlyAdmin {
        Voter storage sender = voter[voterId];
        sender.name = voterName;
        sender.mobile = voterMobile;
        sender.voterId = voterId;
        emit NewVoter(voterName, voterMobile, voterId);
    }
}
