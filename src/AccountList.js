/* @flow */

import React, { PureComponent } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	ActivityIndicator,
	Clipboard,
	TouchableOpacity,
} from 'react-native';

import PTRView from 'react-native-pull-to-refresh';

import Contract from 'truffle-contract';

import ZettaTokenArtifact from '../build/contracts/ZettaToken.json';

const ZettaToken = Contract(ZettaTokenArtifact);

type Props = {
	web3: *,
};
type State = {
	accounts: Array<*>,
	peers: *,
};
type ItemProps = {
	account: string,
	balance: {
		account: string,
	},
};
const Item = ({ account, balance }: ItemProps) => {
	return (
		<View key={account} style={styles.main}>
			<TouchableOpacity
				onPress={() => Clipboard.setString(account)}
				style={styles.icon}
			>
				<FontAwesome name="clipboard" size={22} color={'grey'} />
			</TouchableOpacity>
			<View style={styles.row}>
				<Text style={[styles.hash]}>{account}</Text>
				<Text style={[styles.caption]}>{balance.account}</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	caption: {
		fontSize: 18,
		color: 'grey',
	},
	hash: {
		fontSize: 9,
		color: 'grey',
	},
	icon: {
		paddingHorizontal: 10,
	},
	main: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	votes: {
		fontSize: 16,
		marginHorizontal: 5,
		color: 'yellow',
	},
	row: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		alignItems: 'center',
		paddingVertical: 10,
		flex: 1,
		borderBottomColor: '#CCC',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
});

export default class AccountList extends PureComponent<Props, State> {
	state = {
		accounts: [],
		peers: 0,
	};
	componentWillMount() {
		ZettaToken.setProvider(this.props.web3.currentProvider);
	}
	componentDidMount() {
		const refreshBalances = () => {
			this.getAccountBalances();
		};
		refreshBalances();
	}
	getAccountBalance: Function;
	getAccountBalance = (account: *) => {
		return ZettaToken.deployed()
			.then(zetta => {
				return zetta.balanceOf.call(account, { from: account });
			})
			.then(function(value) {
				return { account: value.valueOf() };
			})
			.catch(function(e) {
				console.log(e);
				throw e;
			});
	};

	getAccountBalances: Function;
	getAccountBalances = () => {
		this.props.web3.eth.getAccounts((err, accs: Array<string>) => {
			if (err != null) {
				console.error(err);
				return;
			}

			if (accs.length === 0) {
				console.error(
					"Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
				);
				return;
			}
			var accountsAndBalances = accs.map(account => {
				return this.getAccountBalance(account).then(balance => {
					return { account, balance };
				});
			});

			Promise.all(accountsAndBalances).then(accountsAndBalances => {
				this.setState({
					accounts: accountsAndBalances,
				});
			});
		});
	};
	render() {
		return (
			<PTRView onRefresh={this.getAccountBalances}>
				<ScrollView>
					{this.state.accounts && this.state.accounts.length > 0 ? (
						this.state.accounts.map(Item)
					) : (
						<ActivityIndicator size="large" color="#000" />
					)}
				</ScrollView>
			</PTRView>
		);
	}
}
