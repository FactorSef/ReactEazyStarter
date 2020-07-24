var postcssNormalize = require('postcss-normalize')

module.exports = {
	syntax: 'postcss-syntax',
	parser: 'postcss-syntax',
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
};
