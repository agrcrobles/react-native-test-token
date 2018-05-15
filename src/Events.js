/* @flow */

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Contract from 'truffle-contract';

import ZettaTokenArtifact from '../build/contracts/ZettaToken.json';

const ZettaToken = Contract(ZettaTokenArtifact);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	description: {
		color: '#eee',
		paddingHorizontal: 12,
		paddingVertical: 9,
		backgroundColor: '#444',
	},
});

export default class Events extends React.Component<
	{
		web3: *,
	},
	{
		result: string,
	}
> {
	state = {
		result: "",
	};
	componentWillMount() {
		ZettaToken.setProvider(this.props.web3.currentProvider);
	}
	componentDidMount() {
		ZettaToken.deployed()
		.then(zetta => {
			// listening to Transfer events
			var events = zetta.allEvents();
			events.watch((error, result) => {
				this.setState({
					result,
				});
			});
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.description}>Events</Text>
				<Text>{JSON.stringify(this.state.result)}</Text>
			</View>
		);
	}
}
