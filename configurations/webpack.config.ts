import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import Pathes from './pathes';
import Helpers from './helpers';
import extensions from './extensions';

const { NODE_ENV } = process.env;
const isProduction = Helpers.isProduction(NODE_ENV);

const config: webpack.Configuration = {
	mode: Helpers.clampEnv(NODE_ENV),
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	target: 'web',
	context: Pathes.staticPathes.app,
	entry: {
		app: Helpers.map(
			!Helpers.isProduction(NODE_ENV) && 'react-hot-loader/patch',
			Pathes.staticPathes.entry
		) as [string, ...string[]],
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
			'react-dom': '@hot-loader/react-dom',
			...Pathes.aliases,
		},
	},
	module: {
		rules: [
			{
				test: /\.[jt]s(x)?$/,
				exclude: /node_modules/,
				use: [
					'react-hot-loader/webpack',
					'babel-loader',
				],
			}
		]
	},
	plugins: Helpers.map(
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
		new webpack.HotModuleReplacementPlugin(),
	) as webpack.Plugin[],
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
};

export default config;
