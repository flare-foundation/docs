// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9;

import {IRelay} from "@flarenetwork/flare-periphery-contracts/coston/util-contracts/userInterfaces/IRelay.sol";
import {FlareContractsRegistryLibrary} from "@flarenetwork/flare-periphery-contracts/coston/util-contracts/ContractRegistryLibrary.sol";

contract GetRandomNumber {
    function generateNumber() external view returns (uint256, bool, uint256) {
        address relayAddress =
            FlareContractsRegistryLibrary.getContractAddressByName("Relay");
        IRelay relay = IRelay(relayAddress);
        (uint256 randomNumber, bool isSecure, uint256 timestamp) =
            relay.getRandomNumber();

        return (randomNumber, isSecure, timestamp);
    }
}