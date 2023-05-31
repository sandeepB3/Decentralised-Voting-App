const allCandidates = ["NOTA", "ALICE", "BOB", "CANDICE", "Dave"];

const main = async () => {
    const [admin, voter1, voter2] = await hre.ethers.getSigners();

    const voteContractFactory = await hre.ethers.getContractFactory("VotingPortal");
    const voteContract = await voteContractFactory.deploy(allCandidates);

    await voteContract.deployed();
    console.log("Contract deployed to:", voteContract.address);
    console.log("Contract deployed by:", admin.address);

    let candidate0 = await voteContract.candidates(0);
    console.log("\nCandidate at 0: %s", candidate0);

    await voteContract.addCandidate("ALICE");
    await voteContract.addCandidate("BOB");
    await voteContract.addCandidate("CANDICE");

    let candidate3 = await voteContract.candidates(3);
    console.log("\nCandidate at 3: %s", candidate3);

    let candidates = await voteContract.displayAllCandidate()

    console.log("\nCandidates: ");
    for(let i=0; i<candidates.length; i++ ){
      console.log(candidates[i]);
    }

    await voteContract.StartVoting();
    // await voteContract.addCandidate("DAVE");

    let candidatesFinal = await voteContract.displayAllCandidate()

    console.log("\nCandidates: ");
    for(let i=0; i<candidatesFinal.length; i++ ){
      console.log(candidatesFinal[i]);
    }

    await voteContract.connect(voter1).vote(1, 12345678);
    await voteContract.connect(voter1).vote(2, 23456789);
    await voteContract.connect(voter1).vote(2, 34567890);

    let voter = await voteContract.connect(voter2).voters(12345678);
    console.log("\nVoter voting details: %s", voter);

    await voteContract.FinishVoting();
    // await voteContract.addCandidate("DAVE");

    let name = await voteContract.winnerName();
    console.log("Winner is: %s", name);


};


const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
};
  
runMain();