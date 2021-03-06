import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { Pathes, Helpers } from '../utils';
import extensions from './extensions';
import { mapStyleLoader, optimization } from './webpack';

const { NODE_ENV } = process.env;
const isProduction = Helpers.isProduction(NODE_ENV);

const config: webpack.Configuration = {
	mode: Helpers.clampEnv(NODE_ENV),
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	target: 'web',
	context: Pathes.staticPathes.app,
	entry: {
		app: Helpers.map(!isProduction && 'react-hot-loader/patch', Pathes.staticPathes.entry) as [string, ...string[]],
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
			'react-dom': isProduction ? 'react-dom' : '@hot-loader/react-dom',
			...Pathes.aliases,
		},
	},
	module: {
		rules: [
			{
				test: /\.[jt]s(x)?$/,
				exclude: /node_modules/,
				use: Helpers.map(!isProduction && 'react-hot-loader/webpack', 'babel-loader') as string[],
			},
			// Get loaders for css, sass/scss and less
			...mapStyleLoader(['css', 'sass', 'less'], true),
			{
				test: /\.(svg)$/,
				issuer: {
					test: /\.[jt]s(x)?$/,
				},
				use: [
					{
						loader: '@svgr/webpack',
					},
				],
			},
			{
				test: /\.(svg)$/,
				issuer: {
					test: /\.(c|sa|sc|le)ss/,
				},
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'icons/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(mov|mp4|webm)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'videos/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: Helpers.map(
		isProduction && new CleanWebpackPlugin(),
		new ESLintPlugin({
			files: '*',
			extensions: ['js', 'ts', 'jsx', 'tsx'],
		}),
		new StyleLintPlugin({
			configFile: Helpers.resolvePath('.stylelintrc.json'),
			files: '**/*.(c|sa|sc|le)ss',
			fix: false,
			failOnError: false,
		}),
		new MiniCSSExtractPlugin({
			filename: 'css/[name].[hash].[id].css',
			chunkFilename: 'css/[chunkhash].[id].css',
		}),
		new webpack.DefinePlugin({
			...Helpers.mapEnv('NODE_ENV'),
		}),
		new HtmlWebpackPlugin({
			template: Pathes.staticPathes.template,
			minify: isProduction && {
				removeComments: true,
				removeEmptyAttributes: true,
			},
		}),
		new webpack.HotModuleReplacementPlugin()
	) as webpack.Plugin[],
	optimization: optimization(isProduction),
	stats: isProduction ? 'normal' : 'errors-warnings',
	devServer: {
		hot: true,
		historyApiFallback: true,
		open: false,
	},
};

export default config;
