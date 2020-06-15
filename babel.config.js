module.exports = function (api) {
	api.cache(true);

	const presets = [
		'@babel/preset-typescript',
		'@babel/preset-react',
		'@babel/preset-env',
	];

	const plugins = [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'react-hot-loader/babel',
		'lodash',
		'@babel/plugin-proposal-logical-assignment-operators',
		'@babel/plugin-proposal-optional-chaining',
	];

	return {
		presets,
		plugins,
	};
};
