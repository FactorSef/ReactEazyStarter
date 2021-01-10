/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Types
import { ConfigOptions } from './types';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';

// Webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// Utils
import { resolvePath } from './utils/paths';
import makeStyleLoaders from './utils/makeStyleLoader';

function resolveClientEnv(options, raw) {
	const env = {} as { [key: string]: string };
	Object.keys(process.env).forEach((key) => {
		if (/^REACT_APP_/.test(key) || key === 'NODE_ENV') {
			env[key] = process.env[key];
		}
	});

	env.BASE_URL = options.publicPath;

	if (raw) {
		return env;
	}

	for (const key in env) {
		env[key] = JSON.stringify(env[key]);
	}
	return {
		'process.env': env,
	};
}

function makeConfig(options: ConfigOptions): Configuration {
	process.env.NODE_ENV = options.mode; // Set NODE_ENV

	const webpackConfig: Configuration = {
		mode: options.mode,
		entry: {
			app: resolvePath(options.entryFile),
		},
		output: {
			path: resolvePath(options.outputDir),
			filename: '[name].bundle.js',
		},
		target: 'browserslist',
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
		},
		module: {
			rules: [
				{
					oneOf: [
						{
							test: /\.[jt]s(x)?$/, // check js, ts, jsx or tsx files
							exclude: /node_modules/,
							use: ['babel-loader'],
						},
						...makeStyleLoaders('css'),
						...makeStyleLoaders('css', true),
						...makeStyleLoaders('sass'),
						...makeStyleLoaders('sass', true),
						...makeStyleLoaders('less'),
						...makeStyleLoaders('less', true),
						{
							test: /\.(s)?[ac]ss$/,
							use: [
								'style-loader',
								'css-loader',
								'postcss-loader',
								'sass-loader',
							],
						},
						{
							test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
							type: 'asset/resource',
						},
						{
							test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
							type: 'asset/inline',
						},
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: resolvePath('public/index.html'),
				filename: 'index.html',
				templateParameters: (
					compilation,
					assets,
					assetTags,
					pluginOptions
				) => {
					// enhance html-webpack-plugin's built in template params
					return Object.assign(
						{
							// make stats lazy as it is expensive
							// TODO: not sure if it's still needed as of <https://github.com/jantimon/html-webpack-plugin/issues/780#issuecomment-390651831>
							compilation: compilation,
							webpackConfig: compilation.options,
							htmlWebpackPlugin: {
								files: assets,
								options: pluginOptions,
							},
						},
						resolveClientEnv(options, true /* raw */)
					);
				},
			}),
			new CleanWebpackPlugin(),
			new HotModuleReplacementPlugin(),
		],
		optimization: {
			minimize: options.mode === 'production',
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					defaultVendors: {
						name: 'vendors',
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true,
						automaticNameDelimiter: '.',
					},
					common: {
						name: 'common',
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
						automaticNameDelimiter: '.',
					},
				},
			},
		},
	};

	return webpackConfig;
}

export default makeConfig;
