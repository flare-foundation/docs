# 📖 Glossary

Avalanche { #avalanche }
: An open-source blockchain using the Snow family of consensus protocols and Proof of Stake for Sybil resistance. It is advertised as the fastest smart contract platform.

Block { #block }
: For performance reasons, instead of processing transactions one by one, they are grouped together in blocks which are then validated by the consensus algorithm.

Blockchain { #blockchain }
: Digital ledger storing data and transactions on a distributed network of computers to make it more robust. Cryptography protects against information tampering, and a consensus algorithm ensures that the majority of the network agrees on the stored data even if some of the nodes act maliciously.

Byzantine Fault Tolerance { #byzantine_fault_tolerance }
: Property of a distributed system that is capable of continuous operation even when some of its participants are unreliable. Participants acting against the interest of the whole system, by accident or on purpose, are said to have “gone Byzantine”.

Canary Network { #canary_network }
: A network used for testing features under “real fire” conditions, before deploying them on the main network. All users of the canary network are real users, but they are aware of the experimental nature of the platform. The name comes from the time when actual mariners used actual canaries to detect the presence of poisonous gas in the mines.

Consensus { #consensus }
: Algorithm that makes nodes on a blockchain’s network agree on the validity of a given transaction, even if some of the nodes provide invalid transactions or try to disrupt the network (Byzantine Fault Tolerance).

Coston { #coston }
: The name given to the Flare public test network launched in January 2022, in remembrance and celebration of a great inventor, Martha J. Coston (1826-1904).

DAO { #dao }
: A Decentralized Autonomous Organization is an entity with no central authority. Its governance is mandated by rules encoded on a blockchain so it is tamper-proof.

Dapp { #dapp }
: A Distributed Application is a computer program that makes use of blockchain technology and therefore the information it uses or stores has the same benefits (trustlessness, censorship resistance, geographical redundancy, etc). The dapp itself may or may not be hosted on a blockchain.

DeFi { #defi }
: Decentralized Finance is a form of finance that does not rely on a central financial institution. DeFi is commonly based on blockchain technology.

Delegate { #delegate }
: To assign a duty to someone else so they do it for you. On the Flare network, an address can delegate any fraction of the votes associated with the tokens it holds to another address, for the purpose of FTSO weighting or governance participation. Note that no tokens are transferred.

EVM { #evm }
: The Ethereum Virtual Machine allows executing smart contracts on the Ethereum network, regardless of the kind of computer that executes it. Multiple blockchain networks, like Flare, support EVM contracts.

FBA { #fba }
: Federated Byzantine Agreement is a form of Byzantine fault tolerance where each node keeps its own list of trusted nodes. It does not require nodes to invest stake or computing power as Proof-of-Stake or Proof-of-Work protocols do.

FCP { #fcp }
: The Flare Consensus Protocol is an asynchronous, ordered and leaderless version of Federated Byzantine Agreement (FBA) consensus. The whitepaper is already available and it is currently in the process of being implemented.

FTSO { #ftso }
: The Flare Time Series Oracles provide external information to the Flare network in a decentralized manner, by using multiple independent signal providers that are rewarded for providing accurate information.

Governance { #governance }
: Mechanism to propose, vote and implement changes on a blockchain protocol. On Flare, anybody can propose updates and Spark token holders vote to accept them.

Liquidity Pool { #liquidity_pool }
: A collection of funds locked in a smart contract for the purpose of facilitating trading, lending and other functionality in a decentralized manner.

Main Network { #main_network }
: The computer network that supports a blockchain in its production stage, i.e., the real thing (instead of a Canary network).

Metaverse { #metaverse }
: An old concept, at times called Virtual Reality or Cyberspace, that translates human interaction to virtual (i.e. non-existing) worlds. Currently in vogue again because blockchain technology promises to link the physical and the virtual worlds and thus bring a degree of reality to the latter.

NFT { #nft }
: Non-Fungible Tokens are digital representations of assets which are unique and therefore non-mergeable (non-fungible), made unforgeable by blockchain technology. Common use cases are certificates of authenticity or ownership, or limited edition collectibles. Most NFT tokens are built on the Ethereum network using standards ERC-721 and ERC-1155.

Oracle { #oracle }
: A mechanism to provide external information to a blockchain, so that it can be used by smart contracts, for example. Flare oracles are called FTSO.

Proof of Stake { #proof_of_stake }
: A kind of Sybil resistance based on staking assets to participate in consensus. The rationale is that a participant investing enough assets will not be interested in attacking the network that supports such assets. Moreover, if malicious behavior is detected part of the assets can be taken as punishment.

Proof of Work { #proof_of_work }
: A kind of Sybil resistance based on spending computer power to participate in consensus. The rationale is that attacking the network becomes prohibitively expensive in terms of computer power.

Quantum Resistance { #quantum_resistance }
: The ability of a cryptographic algorithm (and therefore of a blockchain) to resist an attack from a theoretical quantum computer.

Quorum { #quorum }
: Set of participants on a consensus algorithm that must agree on a result for the whole network to accept that result. On a blockchain, once consensus is reached about a block, it is added to the ledger and the next block is processed.

Quorum Slice { #quorum_slice }
: In FBA consensus each node has multiple lists of other nodes which it voluntarily decides to trust, forming its quorum slices. All nodes in a quorum slice agreeing on a result are enough to convince the node of that result. If the quorum slices are correctly built, global quorum emerges from these local quorum slices.

RPC { #rpc }
: Remote Procedure Call is a protocol that allows a program executing on a network to request a service from another program, typically running on a different computer.

Signal Provider { #signal_provider }
: Each of the multiple programs supplying external information to an FTSO running on the Flare network, and getting rewarded for it. Spark token holders can delegate their stake on a signal provider and share the rewards.

Smart Contract { #smart_contract }
: Computer program running on a blockchain, typically the EVM. The blockchain’s immutability ensures that the contract is not tampered with, and running it on several machines bound together by a consensus algorithm ensures faithful execution. Smart contracts are said to be self-enforcing.

Spark Token (FLR) { #spark_token_(flr) }
: The native currency of the Flare Network.

State Connector { #state_connector }
: Piece of the Flare network that keeps track of the state of other networks, facilitating the implementation of advanced mechanisms like the F-Assets. The State Connector uses several independent Attestation Providers that are rewarded for providing correct information.

Sybil Resistance { #sybil_resistance }
: The ability of a distributed system to overcome a Sybil attack, in which a malicious actor creates multiple identities to gain voting or mining power. Resistance is typically gained by making voting or mining too costly for the attack to be worth it (as in Proof-of-Work or Proof-of-Stake) or by requiring new entities to be approved by existing actors (as in FBA).

Transaction { #transaction }
: A request to add information to the blockchain, which is then analyzed by the network and accepted when consensus is reached about its validity. It can be a movement of funds between two accounts, or the execution of a contract, for example.

Transaction Fee { #transaction_fee }
: Amount of cryptocurrency that must be paid by anybody submitting a transaction for inclusion on a blockchain. These fees reward block producers for their work processing transactions, and typically vary depending on network congestion.

Token { #token }
: A digital representation of an asset. Fungible tokens are indistinguishable from one another so they can be merged together (e.g. a cryptocurrency). Non-fungible tokens (NFT) are unique and therefore cannot be merged.

Turing-completeness { #turing-completeness }
: The ability of a machine to solve any computational problem, no matter how complex, given the necessary steps and enough time and memory. This is a mandatory feature of any general-purpose processor like a CPU or the EVM.

Validator { #validator }
: A validator node is a machine connected to a blockchain network that verifies transactions and emits a vote. When there is a quorum among all validators regarding a given block of transactions, they are accepted into the blockchain.

