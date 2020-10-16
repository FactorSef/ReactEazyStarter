import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../configurations/webpack.config';

webpackConfig.plugins.push(new webpack.ProgressPlugin());

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

	console.clear();
	console.log();
	console.log(`  App running at:`);
	console.log(`  http://${getServerAddress(server).address}:${getServerAddress(server).port}`);
	console.log();
});

server.listen(webpackConfig.devServer.port || 8080, webpackConfig.devServer.host || 'localhost', () => {
	console.log('The server was started');
});


function getServerAddress(server: unknown) {
	return (server as { listeningApp: { address: () => { address: string, port: number } } }).listeningApp.address();
}
