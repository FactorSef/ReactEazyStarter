import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { loader } from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import pathes from './pathes';
import postcss from './postcss';
import css from './css';

const isProduction = process.env.NODE_ENV === 'production';

const mode =
	process.env.NODE_ENV === 'development'
		? 'development'
		: process.env.NODE_ENV === 'production'
		? 'production'
		: 'development';

const extensions = [
	'.ts',
	'.tsx',
	'.js',
	'.jsx',
	'.css',
	'.sass',
	'.scss',
	'.less',
	'.json',
];

const config: webpack.Configuration = {
	mode,
	devtool: isProduction ? 'source-map' : '#eval-source-map',
	context: pathes.appDir,
	entry: {
		app: [
			!isProduction && 'react-hot-loader/patch',
			pathes.appEntry,
		].filter(Boolean),
	},
	target: 'web',
	resolve: {
		extensions,
	},
	output: {
		filename: 'js/[name].js',
		path: pathes.outputDir,
		publicPath: '/',
		chunkFilename: 'js/[name].js',
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.[jt]s(x)?$/,
				exclude: /node_modules/,
				use: ['eslint-loader'],
			},
			{
				test: /\.[jt]s(x)?$/,
				exclude: '/node_modules/',
				use: ['react-hot-loader/webpack', 'babel-loader'],
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					...css(true, isProduction),
					{
						loader: 'sass-loader',
						options: { sourceMap: isProduction },
					},
					postcss('scss', isProduction),
				],
				include: /\.module\.s[ac]ss$/,
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					...css(false, isProduction),
					{
						loader: 'sass-loader',
						options: { sourceMap: isProduction },
					},
					postcss('scss', isProduction),
				],
				exclude: /\.module\.s[ac]ss$/,
			},
			{
				test: /\.less$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					...css(true, isProduction),
					{
						loader: 'less-loader',
						options: { sourceMap: isProduction },
					},
					postcss('less', isProduction),
				],
				include: /\.module\.less$/,
			},
			{
				test: /\.less$/,
				use: [
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
					...css(false, isProduction),
					{
						loader: 'less-loader',
						options: { sourceMap: isProduction },
					},
					postcss('less', isProduction),
				],
				exclude: /\.module\.less$/,
			},
			{
				test: /\.svg$/,
				issuer: {
					test: /\.[jt]s(x)?$/,
				},
				use: [
					{ loader: '@svgr/webpack' },
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
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
							name: 'video/[name].[ext]',
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
	plugins: [
		new StylelintPlugin({
			failOnError: false,
			files: '**/*.(c|sa|sc|le)ss',
			fix: true,
			configFile: 'stylelint.config.js',
		}),
		new HtmlWebpackPlugin({
			template: pathes.template,
			minify: isProduction && {
				removeComments: true,
				removeEmptyElements: false,
			},
		}),
		new MiniCssExtractPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	optimization: {
		minimize: isProduction,
		splitChunks: {
			automaticNameDelimiter: '.',
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/,
						)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `vendors.${packageName.replace('@', '')}`;
					},
				},
			},
		},
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					output: {
						comments: false,
					},
				},
				extractComments: false,
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: [
						'default',
						{
							discardComments: {
								removeAll: true,
							},
						},
					],
				},
			}),
		],
	},

	devServer: {
		hot: true,
		historyApiFallback: true,
		stats: {
			children: false,
			maxModules: 0,
		},
		open: true,
	},
};

export default config;
