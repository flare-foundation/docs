// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import dependencies
import "forge-std/Test.sol";
import "../src/GettingDataFeeds.sol";

// Test Contract
contract TestGettingDataFeeds is Test {

    string private constant FLARE_RPC =
        "https://flare-api.flare.network/ext/bc/C/rpc";
    uint256 private flareFork;

    function setUp() public {
        flareFork = vm.createFork(FLARE_RPC);
    }

    function testSimplePrice() public {
        vm.selectFork(flareFork);
        GettingDataFeeds datafeeds = new GettingDataFeeds();

        (uint256 _price, uint256 _timestamp, uint256 _decimals) =
            datafeeds.getTokenPriceWei("BTC");

        assertGt(_timestamp, 1695817332,
            "Timestamp expected to be greater than a known past block");
        assertGe(_decimals, 0,
            "Number of decimals expected to be >= 0");
        assertLe(_decimals, 18,
            "Number of decimals expected to be <= 18");
        assertGt(_price, 0,
            "Price expected to be > 0");
        assertLt(_price, 1000000 * 10 ** _decimals,
            "Price expected to be < 1'000'000");
    }
}