/* @flow */

import React, { Component } from 'react';
import Contract from 'truffle-contract';

import {
	View,
	Text,
	TextInput,
	Switch,
	KeyboardAvoidingView,
	Button,
	StyleSheet,
	Alert,
	Linking,
	ScrollView,
} from 'react-native';

import ZettaTokenArtifact from '../build/contracts/ZettaToken.json';

const ZettaToken = Contract(ZettaTokenArtifact);

type Props = {
	web3: *,
};
type State = {
	amount: number,
	address?: string,
	from: string,
	coinbase: *,
	useCoinbase: boolean,
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingBottom: 200,
	},
	button: { padding: 9 },
	input: { padding: 9, fontSize: 10 },
	switch: { marginVertical: 9, marginHorizontal: 12 },
	description: {
		color: '#eee',
		paddingHorizontal: 12,
		paddingVertical: 9,
		backgroundColor: '#444',
	},
});

export default class Transfer extends Component<Props, State> {
	state = {
		amount: 0,
		address: '',
		from: '',
		coinbase: '',
		useCoinbase: true,
	};
	componentWillMount() {
		ZettaToken.setProvider(this.props.web3.currentProvider);
		this.props.web3.eth.getCoinbase((error, coinbase) => {
			this.setState({ coinbase });
		});
	}

	handleSend = e => {
		e.preventDefault();

		ZettaToken.deployed()
			.then(zetta => {
				if (this.state.useCoinbase) {
					return zetta.transfer(this.state.address, this.state.amount, {
						from: this.state.coinbase,
					});
				} else {
					return zetta.transfer(this.state.address, this.state.amount, {
						from: this.state.from,
					});
				}
			})
			.then(function() {
				Alert.alert(
					'Great Choice!',
					'Yeah, thanks for transfering, the transaction will be recorded on the blockchain. Please wait.',
					[
						{
							text: 'OK',
							onPress: () => {
								console.log('ok!');
							},
						},
					],
					{ cancelable: false }
				);

				console.log('SENT');
			})
			.catch(function(e) {
				console.log(e);
			});
	};
	render() {
		return (
			<View style={styles.container}>
				<ScrollView contentContainerStyle={styles.content}>
					<Text style={[styles.description]}>Use Coinbase</Text>
					<Switch
						onValueChange={useCoinbase => this.setState({ useCoinbase })}
						style={styles.switch}
						value={!!this.state.useCoinbase}
					/>
					{!this.state.useCoinbase && (
						<React.Fragment>
							<Text style={[styles.description]}>From</Text>
							<TextInput
								placeholder="From account hash"
								underlineColorAndroid="transparent"
								style={styles.input}
								onChangeText={from => this.setState({ from })}
							/>
						</React.Fragment>
					)}
					<Text style={[styles.description]}>Recipient Address</Text>
					<TextInput
						style={styles.input}
						underlineColorAndroid="transparent"
						placeholder="To Account hash"
						onChangeText={address => this.setState({ address })}
					/>
					<Text style={[styles.description]}>Amount</Text>
					<TextInput
						style={styles.input}
						underlineColorAndroid="transparent"
						placeholder="Amount of token to transfer"
						onChangeText={amount => this.setState({ amount })}
					/>
				</ScrollView>
				<Button title="Send" style={styles.button} onPress={this.handleSend} />
			</View>
		);
	}
}
