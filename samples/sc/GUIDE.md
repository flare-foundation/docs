# State Connector Protocol Script

## Address Validity Attestation Type

Follow the steps below to use the script.

1. Open a new terminal, create a directory, and give it a name of your choice.

```bash
mkdir PROJECT_NAME
cd PROJECT_NAME
```

2. Initialize the project using:

```bash
 npm init
```

3. Initialize and create a hardhat Javascript project.

```bash
npx hardhat init
```

4. Install hardhat and the plugin.

```bash
npm install --save-dev  hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

5. Install the following used Flare Network packages which involves the `state connector protocol` and the `periphery contracts`.

```bash
npm install @flarenetwork/flare-periphery-contract-artifacts
npm install @flarenetwork/flare-periphery-contracts
npm install @flarenetwork/state-connector-protocol
```

6. Create an `.env` and copy the `.env.example` into it. Add your wallet private key. 
7. Make sure you have `Flare Testnet Coston` configured in your wallet and your network is switched to this network. You can add this network from [here](https://chainlist.org/chain/16) to your wallet.
8. Claim faucet CFLR token from [here](https://faucet.towolabs.com/) by adding your wallet address. 
9. Run the script using:

```bash
 npx hardhat run scripts/addressValidity.js
```