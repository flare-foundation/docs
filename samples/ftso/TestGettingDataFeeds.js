const { expect } = require("chai");

describe("GettingDataFeeds", async function () {
    let contract;
    beforeEach(async function () {
        contract = await ethers.deployContract("GettingDataFeeds");
    });
    it("Should return sensible values", async function () {
        const res = await contract.getTokenPriceWei("BTC");

        expect(res._timestamp).to.greaterThan(1695817332);
        expect(res._decimals).to.within(0, 18);
        expect(res._price).to.within(0, 1000000 * 10 ** Number(res._decimals));
    });
});