# react-native-test-token

> Listen solidity events using a token contract in localhost using ganache-cli

## Overview

1. Configured an expo app using v27.0.0
2. Integrated web3 in React Navigation
3. Configure a Simple HttpProvider to Connect web3 to localhost
4. Created a Simple Token in Solidity ( I Called Zetta Token ) implementing EIP20 Interface.
5. Integrated the smart contract artifact + web3 using truffle-contract
6. Invoked transfer/getBalance method of the token contract.
7. Finally, React Native listened to `Transfer` event in EIP20 Custom Token.

```
pragma solidity ^0.4.8;

contract EIP20Interface {
	...
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
	...
}
contract ZettaToken is EIP20Interface {
	mapping (address => uint) balances;
	mapping (address => mapping (address => uint256)) allowed;

	// uint initialSupply
	function ZettaToken() {
		balances[tx.origin] = 10000;
	}

	function transfer(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}
	...
}
```
## Getting started in localhost

1. Configure JSON-RPC node in `truffle.js`, run `ifconfig` on linux or `ifconfig | grep inet` on osx and replace `development` entry ip with your local network IP.

For more information about truffle see [ganache-cli](https://github.com/trufflesuite/ganache-cli)

## Run the app

```bash
# Install dependencies
yarn

# Then launch the testrpc server !
# BE SURE TO CONFIGURE TRUFFLE.JS
npm i -g truffle
npm run contracts:compile
ganache-cli
npm run contracts:migrate

# and from a separate shell Run the mobile app
exp start
```

### React Native dependencies

* [react-navigation](https://github.com/react-community/react-navigation)

### Ethereum dependencies

* [web3](https://github.com/ethereum/web3.js) as the Etherum Javascript API
* [truffle-contract](https://github.com/trufflesuite/truffle-contract) to parse the abstraction of the smart contract

## License

Unlicensed