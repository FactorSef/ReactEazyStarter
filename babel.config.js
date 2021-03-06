/* eslint-disable no-undef */

module.exports = function (api) {
	api.cache(true);

	const development = process.env.NODE_ENV !== 'production';

	const presets = [
		[
			'@babel/preset-typescript',
			{
				isTSX: true,
				allExtensions: true,
				allowNamespaces: true,
				onlyRemoveTypeImports: true,
			},
		],
		[
			'@babel/preset-react',
			{
				development,
			},
		],
		'@babel/preset-env',
		!development && ['minify'],
	].filter(Boolean);

	const plugins = [
		['@babel/plugin-proposal-class-properties', { loose: false }],
		['@babel/plugin-proposal-optional-chaining', { loose: false }],
		'react-hot-loader/babel',
	].filter(Boolean);

	return {
		presets,
		plugins,
	};
};
