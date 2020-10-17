import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { Pathes, Helpers } from '../utils';
import extensions from './extensions';
import { mapStyleLoader } from './webpack';

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
			},
			...mapStyleLoader(['css', 'sass', 'less'], true),
		]
	},
	plugins: Helpers.map(
		new ESLintPlugin({
			files: '*',
			extensions: ['js, ts, jsx, tsx'],
		}),
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
		open: false,
	},
};

export default config;
