/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

module.exports = function (api) {
	api.cache(true);

	const presets = [
		'@babel/preset-typescript',
		'@babel/preset-react',
		'@babel/preset-env',
	];
	const plugins = [
		'react-hot-loader/babel',
	];

	return {
		presets,
		plugins,
	};
};
