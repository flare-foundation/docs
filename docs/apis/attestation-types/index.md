# State Connector Attestation Types

This section describes in detail the available [State Connector](../../tech/state-connector.md) attestation types.

Attestation types define the format of the requests to, and the responses from, the State Connector.
They also specify fully-deterministic rules for valid responses.

They can be used from JavaScript to perform [REST queries](../REST/index.md) to attestation providers, or from Solidity to perform requests to the State Connector and to parse its responses.

Each attestation type has its own structures.
These are the currently available attestation types:

* [AddressValidity](./AddressValidity.md)
* [BalanceDecreasingTransaction](./BalanceDecreasingTransaction.md)
* [ConfirmedBlockHeightExists](./ConfirmedBlockHeightExists.md)
* [EVMTransaction](./EVMTransaction.md)
* [Payment](./Payment.md)
* [ReferencedPaymentNonexistence](./ReferencedPaymentNonexistence.md)
