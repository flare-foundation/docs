# IFtsoRegistry

## getFtso

```solidity
function getFtso(uint256 _ftsoIndex) external view returns (contract IIFtso _activeFtsoAddress)
```

## getFtsoBySymbol

```solidity
function getFtsoBySymbol(string _symbol) external view returns (contract IIFtso _activeFtsoAddress)
```

## getSupportedIndices

```solidity
function getSupportedIndices() external view returns (uint256[] _supportedIndices)
```

## getSupportedSymbols

```solidity
function getSupportedSymbols() external view returns (string[] _supportedSymbols)
```

## getSupportedFtsos

```solidity
function getSupportedFtsos() external view returns (contract IIFtso[] _ftsos)
```

## getFtsoIndex

```solidity
function getFtsoIndex(string _symbol) external view returns (uint256 _assetIndex)
```

## getFtsoSymbol

```solidity
function getFtsoSymbol(uint256 _ftsoIndex) external view returns (string _symbol)
```

## getCurrentPrice

```solidity
function getCurrentPrice(uint256 _ftsoIndex) external view returns (uint256 _price, uint256 _timestamp)
```

## getCurrentPrice

```solidity
function getCurrentPrice(string _symbol) external view returns (uint256 _price, uint256 _timestamp)
```

## getSupportedIndicesAndFtsos

```solidity
function getSupportedIndicesAndFtsos() external view returns (uint256[] _supportedIndices, contract IIFtso[] _ftsos)
```

## getSupportedSymbolsAndFtsos

```solidity
function getSupportedSymbolsAndFtsos() external view returns (string[] _supportedSymbols, contract IIFtso[] _ftsos)
```

## getSupportedIndicesAndSymbols

```solidity
function getSupportedIndicesAndSymbols() external view returns (uint256[] _supportedIndices, string[] _supportedSymbols)
```

## getSupportedIndicesSymbolsAndFtsos

```solidity
function getSupportedIndicesSymbolsAndFtsos() external view returns (uint256[] _supportedIndices, string[] _supportedSymbols, contract IIFtso[] _ftsos)
```

