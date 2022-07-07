# IFtsoRegistry

<div class="api-node-type" markdown>

## Functions

<div class="api-node" markdown>
### getFtso

```solidity
function getFtso(
    uint256 _ftsoIndex
) external view returns (
    contract IIFtso _activeFtsoAddress);
```

</div>
<div class="api-node" markdown>
### getFtsoBySymbol

```solidity
function getFtsoBySymbol(
    string _symbol
) external view returns (
    contract IIFtso _activeFtsoAddress);
```

</div>
<div class="api-node" markdown>
### getSupportedIndices

```solidity
function getSupportedIndices(
) external view returns (
    uint256[] _supportedIndices);
```

</div>
<div class="api-node" markdown>
### getSupportedSymbols

```solidity
function getSupportedSymbols(
) external view returns (
    string[] _supportedSymbols);
```

</div>
<div class="api-node" markdown>
### getSupportedFtsos

```solidity
function getSupportedFtsos(
) external view returns (
    contract IIFtso[] _ftsos);
```

</div>
<div class="api-node" markdown>
### getFtsoIndex

```solidity
function getFtsoIndex(
    string _symbol
) external view returns (
    uint256 _assetIndex);
```

</div>
<div class="api-node" markdown>
### getFtsoSymbol

```solidity
function getFtsoSymbol(
    uint256 _ftsoIndex
) external view returns (
    string _symbol);
```

</div>
<div class="api-node" markdown>
### getCurrentPrice

```solidity
function getCurrentPrice(
    uint256 _ftsoIndex
) external view returns (
    uint256 _price,
    uint256 _timestamp);
```

</div>
<div class="api-node" markdown>
### getCurrentPrice

```solidity
function getCurrentPrice(
    string _symbol
) external view returns (
    uint256 _price,
    uint256 _timestamp);
```

</div>
<div class="api-node" markdown>
### getSupportedIndicesAndFtsos

```solidity
function getSupportedIndicesAndFtsos(
) external view returns (
    uint256[] _supportedIndices,
    contract IIFtso[] _ftsos);
```

</div>
<div class="api-node" markdown>
### getSupportedSymbolsAndFtsos

```solidity
function getSupportedSymbolsAndFtsos(
) external view returns (
    string[] _supportedSymbols,
    contract IIFtso[] _ftsos);
```

</div>
<div class="api-node" markdown>
### getSupportedIndicesAndSymbols

```solidity
function getSupportedIndicesAndSymbols(
) external view returns (
    uint256[] _supportedIndices,
    string[] _supportedSymbols);
```

</div>
<div class="api-node" markdown>
### getSupportedIndicesSymbolsAndFtsos

```solidity
function getSupportedIndicesSymbolsAndFtsos(
) external view returns (
    uint256[] _supportedIndices,
    string[] _supportedSymbols,
    contract IIFtso[] _ftsos);
```

</div>
</div>

