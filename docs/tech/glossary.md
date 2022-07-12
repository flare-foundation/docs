# Glossary

Attestation { #attestation }
: A data proof provided to the [State Connector](#state_connector) by a decentralized set of Attestation Providers that confirms the validity or otherwise of any request.

Avalanche { #avalanche }
: An open-source blockchain using the Snow family of consensus protocols and [Proof of Stake](#proof_of_stake) for [Sybil resistance](#sybil_resistance). It is advertised as the fastest smart contract platform.

Block { #block }
: For performance reasons, [blockchains](#blockchain) do not process transactions one by one. Instead, transactions are grouped together in blocks which are then validated by the [consensus](#consensus) algorithm.

Blockchain { #blockchain }
: Digital [ledger](#ledger) storing data and transactions on a distributed network of computers to make it more robust. Cryptography protects against information tampering, and a [consensus](#consensus) algorithm ensures that the majority of the network agrees on the stored data even if some of its nodes act maliciously.

Byzantine Fault Tolerance { #byzantine_fault_tolerance }
: Property of a distributed system that is capable of continuous operation even when some of its participants are unreliable. Participants acting against the interest of the whole system, by accident or on purpose, are said to have “gone Byzantine”.

Canary Network { #canary_network }
: A network used for testing features under “real fire” conditions, before deploying them on the [main network](#main_network). All users of the canary network are real users, but they are aware of the experimental nature of the platform. The name comes from the time when actual miners used actual canaries to detect the presence of poisonous gas in the mines. Flare's canary network is called [Songbird](#songbird).

Consensus { #consensus }
: Algorithm that makes nodes on a blockchain’s network agree on the validity of a given transaction, even if some of the nodes provide invalid transactions or try to disrupt the network ([Byzantine Fault Tolerance](#byzantine_fault_tolerance)).

Coston { #coston }
: The name given to the Flare public [test network](#test_network) launched in January 2021, in remembrance and celebration of a great inventor, Martha J. Coston (1826-1904).

Cross-chain (or inter-ecosystem) interoperability { #cross_chain }
: Communication between two or more disparate blockchain ecosystems that are technologically incompatible due to the lack of shared systems, protocols or code (e.g. Ethereum and Solana).

DAO { #dao }
: A Decentralized Autonomous Organization is an entity with no central authority. Its governance is mandated by rules encoded on a blockchain so it is tamper-proof.

dApp { #dapp }
: A Decentralized Application is a computer program that makes use of blockchain technology and therefore the information it uses or stores has the same benefits (trustlessness, censorship resistance, geographical redundancy, etc). The dapp itself may or may not be hosted on a blockchain.

Data Provider { #data_provider }
: Each of the multiple programs supplying external information to an [FTSO](#ftso) running on the Flare network, and getting rewarded for it. Token holders can [delegate](#delegate) their stake to a data provider and receive a share of the rewards.

DeFi { #defi }
: Decentralized Finance is a form of finance that does not rely on a central financial institution. DeFi is commonly based on blockchain technology.

Delegate { #delegate }
: To assign a duty to someone else, so they do it for you. On the Flare network, an address can delegate any fraction of the votes associated with the tokens it holds to another address, for the purpose of [FTSO](#ftso) weighting or governance participation. Note that no tokens are transferred.

EVM { #evm }
: The Ethereum Virtual Machine allows executing smart contracts on the Ethereum network, regardless of the kind of computer that executes it. Multiple blockchain networks, including Flare, support EVM contracts.

FBA { #fba }
: Federated Byzantine Agreement is a form of [Byzantine fault tolerance](#byzantine_fault_tolerance) where each node keeps its own list of trusted nodes. It does not require nodes to invest stake or computing power as [Proof of Stake](#proof_of_stake) or [Proof of Work](#proof_of_work) protocols do.

FCP { #fcp }
: The Flare Consensus Protocol is an asynchronous, ordered and leaderless version of Federated Byzantine Agreement ([FBA](#fba)) consensus. The whitepaper is already available and it is currently in the process of being implemented.

Flare Token (FLR) { #flare_token_(flr) }
: The native currency of the Flare Network.

FTSO { #ftso }
: The Flare Time Series Oracles provide external information to the Flare network in a decentralized manner, by using multiple independent data providers that are rewarded for providing accurate information.

Governance { #governance }
: Mechanism to propose, vote and implement changes on a blockchain protocol. On Flare, anybody can propose updates and token holders vote to accept them.

Ledger { #ledger }
: Historically, a book where financial transactions are recorded. In [blockchain](#blockchain) technology a ledger can contain any kind of information and it has multiple copies distributed among several computers, which are kept in sync by a [consensus](#consensus) algorithm.

Light Client Relay { #light_client_relay }
: A simplified communication mechanism built for speed that only queries the header data of any transaction and therefore lacks the security that comes from querying a full node with full history (e.g. [SPV](https://en.wikipedia.org/wiki/Bitcoin_network#Payment_verification)).

Liquidity Pool { #liquidity_pool }
: A collection of funds locked in a [smart contract](#smart_contract) for the purpose of facilitating trading, lending and other functionality in a decentralized manner.

Main Network (MAINNET) { #main_network }
: The computer network that supports a [blockchain](#blockchain) in its production stage, i.e., the real thing (instead of a [Canary](#canary_network) or [Test](#test_network) network).

Metaverse { #metaverse }
: An old concept, at times called Virtual Reality or Cyberspace, that translates human interaction to virtual (i.e. non-physical) worlds. Currently in vogue again because blockchain technology promises to link the physical and the virtual worlds and thus bring a degree of reality to the latter.

Multi-chain (or intra-ecosystem) interoperability { #multi_chain }
: Communication between two or more technologically compatible blockchains that exist within the same ecosystem and share systems, protocols and code (e.g. Polkadot Parachains, Cosmos Tendermint chains or Ethereum layer 2 protocols).

NFT { #nft }
: Non-Fungible Tokens are digital representations of assets which are unique and therefore non-mergeable (non-fungible), made impossible to copy by blockchain technology. Common use cases are certificates of authenticity or ownership, or limited edition collectibles. Most NFT tokens are built on the Ethereum network using standards ERC-721 and ERC-1155.

Oracle { #oracle }
: A mechanism to provide external information to a blockchain, so that it can be used by [smart contracts](#smart_contract), for example. Flare oracles are called [FTSO](#ftso).

Proof of Stake { #proof_of_stake }
: A kind of [Sybil resistance](#sybil_resistance) based on staking assets to participate in consensus. The rationale is that a participant investing enough assets will not be interested in attacking the network that supports such assets. Moreover, if malicious behavior is detected part of the assets can be taken as punishment.

Proof of Work { #proof_of_work }
: A kind of [Sybil resistance](#sybil_resistance) based on spending computer power to participate in consensus. The rationale is that attacking the network becomes prohibitively expensive in terms of computer power.

Quantum Resistance { #quantum_resistance }
: The ability of a cryptographic algorithm (and therefore of a blockchain) to resist an attack from a theoretical quantum computer.

Quorum { #quorum }
: Set of participants on a [consensus](#consensus) algorithm that must agree on a result for the whole network to accept that result. On a blockchain, once consensus is reached about a [block](#block), it is added to the [ledger](#ledger) and the next block is processed.

Quorum Slice { #quorum_slice }
: In [FBA](#fba) consensus each node has multiple lists of other nodes which it voluntarily decides to trust, forming its quorum slices. All nodes in a quorum slice agreeing on a result are enough to convince the node of that result. If the quorum slices are correctly built, global quorum emerges from these local quorum slices.

RPC { #rpc }
: Remote Procedure Call is a protocol that allows a program executing on a computer to request a service from another program, typically running on a different computer.

Smart Contract { #smart_contract }
: Computer program running on a blockchain, typically one based on the [EVM](#evm). The blockchain’s immutability ensures that the contract is not tampered with, and running it on several machines bound together by a consensus algorithm ensures faithful execution. Smart contracts are said to be self-enforcing.

Songbird { #songbird }
: Flare's [canary network](#canary_network), launched in September 2021.

State Connector { #state_connector }
: Piece of the Flare network that keeps track of the state of other networks, facilitating the implementation of advanced mechanisms like the FAssets. The State Connector uses several independent Attestation Providers that are rewarded for providing correct information. [Read more...](state-connector.md)

Sybil Resistance { #sybil_resistance }
: The ability of a distributed system to overcome a Sybil attack, in which a malicious actor creates multiple identities to gain voting or mining power. Resistance is typically gained by making voting or mining too costly for the attack to be worth it (as in [Proof of Work](#proof_of_work) or [Proof of Stake](#proof_of_stake)) or by requiring new entities to be approved by existing actors (as in [FBA](#fba)).

Test Network (TESTNET) { #test_network }
: The computer network that supports a [blockchain](#blockchain) in its development stage. It is intended for testing purposes and should not store valuable assets, as its contents might be deleted (purposely or by accident) at any time. Compare to a [Canary](#canary_network) or [Main](#main_network) network. Flare's testnet is called [Coston](#coston).

Transaction { #transaction }
: A request to add information to the blockchain, which is then analyzed by the network and accepted when consensus is reached about its validity. It can be a movement of funds between two accounts, or the execution of a contract, for example.

Transaction Fee { #transaction_fee }
: Amount of cryptocurrency that must be paid by anybody submitting a transaction for inclusion on a blockchain. These fees reward block producers for their work processing transactions, and typically vary depending on network congestion.

Token { #token }
: A digital representation of an asset. Fungible tokens are indistinguishable from one another so they can be merged together (e.g. a cryptocurrency). Non-fungible tokens ([NFT](#nft)) are unique and therefore cannot be merged.

Turing-completeness { #turing-completeness }
: The ability of a machine to solve any computational problem, no matter how complex, given the necessary steps and enough time and memory. This is a mandatory feature of any general-purpose processor like a CPU or the [EVM](#evm).

Validator { #validator }
: A validator node is a machine connected to a blockchain network that verifies transactions and emits a vote. When there is a quorum among all validators regarding a given block of transactions, they are accepted into the blockchain.

Voting Power { #voting-power }
: Weight proportional to the tokens held by an address plus the tokens [delegated](#delegate) to it. This weight is used during [FTSO](#ftso) operation and governance votes, for example.

Wen flare { #wen_flare }
: The war cry of all the impatient that would like to see the Flare network launch before it is fully tested. Pay no heed to them.

<style>
    /*Glossary links from within the glossary page*/
    a[href^="#"] {
        text-decoration-style: dotted;
        text-decoration-thickness: 1px;
    }
</style>
