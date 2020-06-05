import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';

import pathes from './pathes';
import postcss from './postcss';

const isProduction = process.env.NODE_ENV === 'production';

const mode = process.env.NODE_ENV === 'development'
	? 'development' : process.env.NODE_ENV === 'production'
		? 'production' : 'none';

const config: webpack.Configuration = {
	mode,
	devtool: isProduction ? 'source-map' : '#eval-source-map',
	entry: {
		app: [
			'react-hot-loader/patch',
			pathes.appEntry,
		],
	},
	target: 'web',
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		// Alias: {
		// 	'react-dom': '@hot-loader/react-dom',
		// },
	},
	output: {
		filename: '[name].js',
		path: pathes.outputDir,
		publicPath: '/',
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(ts|tsx|js|jsx)?$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},
			{
				test: /\.(ts|tsx|js|jsx)?$/,
				exclude: '/node_modules/',
				use: [
					'react-hot-loader/webpack',
					'babel-loader',
				],
			},
			{
				test: /\.(scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 3, sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
					postcss('scss'),
				],
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 3, sourceMap: true } },
					{ loader: 'less-loader', options: { sourceMap: true } },
					postcss('less'),
				],
			},
		],
	},
	plugins: [
		new StylelintPlugin({
			failOnError: true,
		}),
		new HtmlWebpackPlugin({
			template: pathes.template,
		}),
		new MiniCssExtractPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	optimization: {
		minimize: isProduction,
	},

	devServer: {
		hot: true,
		historyApiFallback: true,
		stats: {
			children: false,
			maxModules: 0,
		},
	},
};

export default config;
