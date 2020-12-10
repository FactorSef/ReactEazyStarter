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
	];
	const plugins = [
		'@babel/plugin-proposal-class-properties',
	];

	return {
		presets,
		plugins,
	};
}
