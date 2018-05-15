/* @flow */

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
	},
	Header: {
		paddingTop: 40,
		paddingBottom: 20,
		paddingHorizontal: 12,
		backgroundColor: '#37474f',
		alignItems: 'center',
	},
	titleContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		alignItems: 'center',
		backgroundColor: '#62727b',
	},
	footerContainer: {
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: '#616161',
	},
	title: {
		alignItems: 'center',
		fontSize: 18,
		paddingVertical: 5,
		color: 'white',
	},
	footer: {
		alignItems: 'center',
		fontSize: 11,
		paddingVertical: 5,
		color: 'white',
	},
});

export default class Container extends Component<{
	children?: any,
}> {
	render() {
		return (
			<View style={styles.Container}>
				<View style={styles.titleContainer}>
					<Text style={[styles.title]}>TEST TOKEN FOR HERC</Text>
				</View>
				{this.props.children}
				<View style={styles.footerContainer}>
					<Text style={[styles.footer]}>Unlicensed</Text>
				</View>
			</View>
		);
	}
}
