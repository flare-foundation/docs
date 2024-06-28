// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import dependencies
import "forge-std/Test.sol";
import "../src/GetRandomNumber.sol";

// Test Contract
contract GetRandomNumberTest is Test {
    string private constant FLARE_RPC =
        "https://flare-api.flare.network/ext/bc/C/rpc";
    uint256 private flareFork;

    function setUp() public {
        flareFork = vm.createFork(FLARE_RPC);
    }

    function testRandomNumber() public {
        vm.selectFork(flareFork);
        GetRandomNumber randNumber = new GetRandomNumber();

        (uint256 _randomNumber, bool _isSecure, uint256 _timeStamp) = randNumber
            .getRandomNumber();

        assertGt(_randomNumber, 0, "Random Number expected to be > 0");
        assertTrue(_isSecure, "Expect to be true");
        assertGt(
            _timestamp,
            1695817332,
            "Timestamp expected to be greater than a known past block"
        );
    }
}