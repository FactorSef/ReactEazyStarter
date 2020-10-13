import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import Pathes from './pathes';
import Helpers from './helpers';
import extensions from './extensions';

module.exports = function (env, argv): webpack.Configuration {
	const { NODE_ENV } = process.env;
	const isProduction = Helpers.isProduction(NODE_ENV);

	return {
		mode: Helpers.clampEnv(NODE_ENV),
		devtool: isProduction ? 'source-map' : 'eval-source-map',
		target: 'web',
		context: Pathes.staticPathes.app,
		entry: {
			app: Helpers.map(Pathes.staticPathes.entry),
		},
		output: {
			filename: 'js/[name].js',
			path: Pathes.staticPathes.output,
			publicPath: '/',
			chunkFilename: 'js/[name].chunk.js',
		},
		resolve: {
			extensions,
			alias: {
				...Pathes.aliases,
			},
		},
		module: {
			rules: [
				{
					test: /\.[jt]s(x)?$/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
					],
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				...Helpers.mapEnv('NODE_ENV'),
			}),
			new HtmlWebpackPlugin({
				template: Pathes.staticPathes.template,
				minify: isProduction && ({
					removeComments: true,
					removeEmptyAttributes: true,
					removeEmptyElements: true,
				}),
			}),
		],
		devServer: {
			hot: true,
			historyApiFallback: true,
			stats: {
				children: false,
				maxModules: 0,
				colors: true,
			},
			open: true,
		},
		stats: {
			colors: true,
		}
	}
}
