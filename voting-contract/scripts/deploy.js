const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const allCandidates = ["NONE", "ALICE", "BOB", "CANDICE"];
    
    const voteContractFactory = await hre.ethers.getContractFactory("VotingPortal");
    const voteContract = await voteContractFactory.deploy(allCandidates);
    
    await voteContract.deployed();
  
    console.log("VotePortal address: ", voteContract.address);
  };
    
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
    
  runMain();