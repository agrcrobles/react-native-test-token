/* @flow */
import * as React from 'react';

import { createMaterialTopTabNavigator } from 'react-navigation';

import 'babel-preset-react-native-web3/globals';

import Web3 from 'web3';

import Transfer from './src/Transfer';
import Container from './src/Container';
import AccountList from './src/AccountList';
import Events from './src/Events';

import truffleConfig from './truffle';

const network = truffleConfig.networks.development;
const TESTRPC_ADDRESS = `${network.protocol}://${network.host}:${network.port}`;
const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
const web3 = new Web3(web3Provider);

class TransferScreen extends React.PureComponent<{}> {
	static navigationOptions = {
	};
	render() {
		return <Transfer web3={web3} />;
	}
}
class EventsScreen extends React.PureComponent<{}> {
	static navigationOptions = {
	};
	render() {
		return <Events web3={web3} />;
	}
}
class AccountListScreen extends React.PureComponent<{}> {
	static navigationOptions = {
	};
	render() {
		return <AccountList web3={web3} />;
	}
}

const AppNavigation = createMaterialTopTabNavigator({
	Events: { screen: EventsScreen },
	Transfer: { screen: TransferScreen },
	AccountList: { screen: AccountListScreen },
});

export default class App extends React.PureComponent<{}> {
	render() {
		return (
			<Container>
				<AppNavigation />
			</Container>
		);
	}
}
