/* eslint-disable */

const postcssNormalize = require('postcss-normalize');

type StringExtend = 'scss' | 'less';

export default (parser: StringExtend, useSourceMap: boolean = false) => ({
	loader: 'postcss-loader',
	options: {
		syntax: `postcss-${parser}`,
		parser: `postcss-${parser}`,
		plugins: () => [
			require('postcss-flexbugs-fixes')(),
			require('postcss-preset-env')({
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
			}),
			postcssNormalize(),
		],
		sourceMap: useSourceMap,
	}
});
