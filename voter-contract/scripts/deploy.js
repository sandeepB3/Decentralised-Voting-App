const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const voterIds = [1234, 2345, 3456, 4567];
    const names = ["Sandeep Pillai", "Shreya Gurav", "Darshan Lahamage", "Rohan Rane"];
    const mobileNums = ["9892634393", "9699120796", "7020322376", "8424332838"];

    const voterContractFactory = await hre.ethers.getContractFactory("Voters");
    const voterContract = await voterContractFactory.deploy(voterIds, names, mobileNums);
    
    await voterContract.deployed();
  
    console.log("Voters contract address: ", voterContract.address);
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
