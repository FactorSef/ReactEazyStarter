// const Webpack = require('webpack');
// const WebpackDevServer = require('../../../lib/Server');
// const webpackConfig = require('./webpack.config');

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../configurations/webpack.config';

const compiler = webpack(webpackConfig);

const devServerOptions = {
	...webpackConfig.devServer,
	stats: {
		children: false,
		maxModules: 0,
		colors: true,
		hash: false,
		version: false,
		timings: true,
		builtAt: false,
		assets: false,
		entrypoints: false,
		modules: false,
	} as webpack.Options.Stats,
};

const server = new WebpackDevServer(compiler, devServerOptions);

compiler.hooks.done.tap('React Eazy Starter serve', stats => {
	if (stats.hasErrors()) {
		return;
	}

	// process.stdout.write("\u001b[2J\u001b[0;0H");
	console.clear();
	console.log();
	console.log(`  App running at:`);
	console.log(`  http://${getServerAddress(server).address}:${getServerAddress(server).port}`);
	console.log();
});

server.listen(webpackConfig.devServer.port || 8080, webpackConfig.devServer.host || '127.0.0.1', () => {
	console.log('The server was started');
});


function getServerAddress(server: any) {
	return server.listeningApp.address() as { address: string, port: number };
}
