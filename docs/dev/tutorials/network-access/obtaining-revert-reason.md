# Obtaining a Transaction's Revert Reason

Sometimes contract calls revert and throw a generic "Transaction has been reverted" exception which is not very helpful, since it does not contain the revert reason.

In this case, simulating the call in the EVM without sending any transaction, using the [`.call()`](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-call) syntax, can provide the missing information, assuming the blockchain's state has not changed much between calls.

The whole process is:

* Catch the exception, and check if the revert reason is part of the exception data.

If not:

* Repeat the same contract call using `.call()` syntax and parse the revert reason.

Note that the second step should be performed as soon as possible, to ensure that the chain has a similar state in both calls.

The function below demonstrates this process.

```javascript
async function contractCall(account, to, gas, gasPrice, fnToEncode, nonce) {
  let tx = {from: account.address, to, gas, gasPrice, data: fnToEncode.encodeABI(), nonce};
  let signedTx = await account.signTransaction(tx);
  try {
    return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  } catch (e) {
    if (e.message.indexOf("Transaction has been reverted by the EVM") >= 0) {
      // This call should throw a new exception containing the revert reason
      await fnToEncode.call({ from: account.address });
    }
    // Otherwise, either revert reason was already part of the original error or
    // we failed to get any additional information.
    throw e;
  }
}
```

Where `account` and `fnToEncode` are obtained, for example, as follows:

```javascript
let account = web3.eth.accounts.privateKeyToAccount(privateKey);
let fnToEncode = web3Contract.methods.someMethodOnContract(param1, param2);
```
