const hre = require("hardhat");

// Returns the Ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses.
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx++;
  }
}

// Logs the memos stored on-chain from Chai purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

async function main() {
  // Get the example accounts we'll be working with.
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const BuyMeAChai = await hre.ethers.getContractFactory("BuyMeAChai");
  const buyMeAChai = await BuyMeAChai.deploy();

  // Deploy the contract.
  await buyMeAChai.deployed();
  console.log("BuyMeAChai deployed to:", buyMeAChai.address);

  // Check balances before the Chai purchase.
  const addresses = [owner.address, tipper.address, buyMeAChai.address];
  console.log("== start ==");
  await printBalances(addresses);

  // Buy the owner a few Chais.
  const tip = { value: hre.ethers.utils.parseEther("1") };
  await buyMeAChai.connect(tipper).buyChai("Carolina", "You're the best!", tip);
  await buyMeAChai.connect(tipper2).buyChai("Vitto", "Amazing teacher", tip);
  await buyMeAChai
    .connect(tipper3)
    .buyChai("Kay", "I love my Proof of Knowledge", tip);

  // Check balances after the Chai purchase.
  console.log("== bought Chai ==");
  await printBalances(addresses);

  // Withdraw.
  await buyMeAChai.connect(owner).withdrawTips();

  // Check balances after withdrawal.
  console.log("== withdrawTips ==");
  await printBalances(addresses);

  // Check out the memos.
  console.log("== memos ==");
  const memos = await buyMeAChai.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
