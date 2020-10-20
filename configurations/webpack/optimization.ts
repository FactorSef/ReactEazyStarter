/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Options } from 'webpack';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export function getOptimization(isProduction?: boolean): Options.Optimization {
	if (!isProduction) {
		return null;
	}

	return {
		minimize: true,
		splitChunks: {
			automaticNameDelimiter: '.',
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module: { context: string }) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = /[\\/]node_modules[\\/](.*?)([\\/]|$)/.exec(module.context)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `vendors.${packageName.replace('@', '')}`;
					},
				},
			},
		},
		minimizer: [
			new OptimizeCssAssetsPlugin({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', { discardComments: { removeAll: true } }],
				},
				canPrint: true,
			}),
		],
	};
}
