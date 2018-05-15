module.exports = {
	networks: {
		development: {
			protocol: 'http',
			host: '192.168.1.40', // this url is local@home and should be changed
			port: 8545,
			network_id: '*',
		},
		localhost: {
			protocol: 'http',
			host: 'localhost',
			port: 8545,
			network_id: '*',
		}
	},
};
