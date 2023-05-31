
const main = async () => {
    const [admin, voter1, voter2, voter3] = await hre.ethers.getSigners();

    const voterContractFactory = await hre.ethers.getContractFactory("Voters");
    const voterContract = await voterContractFactory.deploy();

    await voterContract.deployed();
    console.log("Contract deployed to:", voterContract.address);
    console.log("Contract deployed by:", admin.address);

    let voter_1 =  await voterContract.connect(voter1).getVoter(1234);
    console.log("Voter 1: %s", voter_1);

    let voter_2 =  await voterContract.connect(voter2).getVoter(2345);
    console.log("Voter 2: %s", voter_2);

    let voter_3 =  await voterContract.connect(voter3).getVoter(3456);
    console.log("Voter 3: %s", voter_3);

    await voterContract.updateVoter(1234);
    let voter1_updated =  await voterContract.getVoter(1234);
    console.log("Voter 1 after update: %s", voter1_updated);

}


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