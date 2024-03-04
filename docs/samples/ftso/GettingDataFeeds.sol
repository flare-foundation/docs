// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// 1. Import dependencies
import "@flarenetwork/flare-periphery-contracts/flare/util-contracts/userInterfaces/IFlareContractRegistry.sol";
import "@flarenetwork/flare-periphery-contracts/flare/ftso/userInterfaces/IFtsoRegistry.sol";

contract GettingDataFeeds {

    address private constant FLARE_CONTRACT_REGISTRY =
        0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019;

    function getTokenPriceWei(
        string memory _symbol
    ) public view returns(
        uint256 _price, uint256 _timestamp, uint256 _decimals)
    {
        // 2. Access the Contract Registry
        IFlareContractRegistry contractRegistry = IFlareContractRegistry(
            FLARE_CONTRACT_REGISTRY);

        // 3. Retrieve the FTSO Registry
        IFtsoRegistry ftsoRegistry = IFtsoRegistry(
            contractRegistry.getContractAddressByName('FtsoRegistry'));

        // 4. Get latest price
        (_price, _timestamp, _decimals) =
            ftsoRegistry.getCurrentPriceWithDecimals(_symbol);
    }

}