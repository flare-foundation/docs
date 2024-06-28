const FLARE_CONTRACTS = "@flarenetwork/flare-periphery-contract-artifacts";
const FLARE_RPC = "https://coston-api.flare.network/ext/C/rpc";
const FLARE_CONTRACT_REGISTRY_ADDR =
  "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

async function runGetRandomNumber() {
  // 1. Import Dependencies
  const ethers = await import("ethers");
  const flare = await import(FLARE_CONTRACTS);
  const provider = new ethers.JsonRpcProvider(FLARE_RPC);

  // 2. Access the Contract Registry
  const flareContractRegistry = new ethers.Contract(
    FLARE_CONTRACT_REGISTRY_ADDR,
    flare.nameToAbi("FlareContractRegistry", "coston").data,
    provider
  );

  // 3. Retrieve the Relay Contract
  const relayAddress = await flareContractRegistry.getContractAddressByName(
    "Relay"
  );
  const relay = new ethers.Contract(
    relayAddress,
    flare.nameToAbi("IRelay", "coston").data,
    provider
  );

  // 4. Get the Random Number
  const [randomNumber, isSecure, timestamp] = await relay.getRandomNumber();
  console.log("Random Number is", randomNumber);
  console.log("Is it secure", isSecure);
  console.log("Creation timestamp is", timestamp);
}

runGetRandomNumber();