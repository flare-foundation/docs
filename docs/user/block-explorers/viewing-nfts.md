# Viewing NFTs

!!! example "This page is for advanced users."

Use the block explorer to view NFTs.
Before you begin, ensure the status of the transaction to mint the NFT is **Confirmed**.

The following guide refers to the [original Flare block explorers](./index.md).

1. Retrieve the transaction hash for the NFT.
2. Open a [block explorer](./index.md) for the appropriate network.
   [The block explorer dashboard](./user-interface.md) is displayed.
3. Specify the NFT transaction hash from Step 1 in the **Search** field, and click the result.
   The **Transaction Details** page is displayed.
4. Locate the **Tokens Minted** section.
   The value of the **For** parameter is the numerical ID for the NFT.
5. Click the ID. The NFT collection page is displayed.
   In most cases, your NFT is displayed in the upper-right hand side of the page.
   However, if the NFT creator used public IPFS gateways or did not create the NFT according to the ERC-721 or ERC-1155 standards, the NFT might not display.
