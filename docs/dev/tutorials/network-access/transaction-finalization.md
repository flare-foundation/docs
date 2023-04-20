# Checking Transaction Finalization

On Flare and Songbird, obtaining the receipt of a submitted transaction does not guarantee that the transaction is finalized.
One has to wait until the sender's account nonce (the total number of sent transactions) increases.

The following function shows how to send a signed transaction and wait for its finalization.

The function polls the current nonce up to 8 times before giving up, using an exponential backoff.
This means that the time spent between successive polls of the nonce is increased exponentially to avoid taxing the network too much.

```javascript
async function sendAndFinalize(senderAddress, signedTx, delay = 1000) {
  let oldNonce = await web3.eth.getTransactionCount(senderAddress);
  let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  let backoff = 1.5;
  let maxRetries = 8;
  while ((await web3.eth.getTransactionCount(senderAddress)) == oldNonce) {
    await new Promise((resolve) => {setTimeout(()=>{resolve()}, delay)})
    maxRetries--;
    if(maxRetries == 0) {
      throw new Error("Response timeout");
    }
    delay = Math.floor(delay * backoff);
  }
  return receipt;
}
```
