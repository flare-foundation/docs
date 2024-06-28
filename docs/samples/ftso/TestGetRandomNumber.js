const { expect } = require("chai");
describe("Test Random Number", function () {
  let contract;
  beforeEach(async function () {
    contract = await ethers.deployContract("GetRandomNumber");
  });

  it("RandomNumber", async function () {
    const [randomNumber, isSecure, timestamp] = await contract.generateNumber();
    expect(randomNumber).to.be.at.least(
      1000000000000000000000000000000000000000n
    );
    expect(isSecure).to.be.true;
    expect(timestamp).to.be.gt(1695817332);
  });
});