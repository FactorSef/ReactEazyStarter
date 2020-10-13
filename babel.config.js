module.exports = function (api) {
	api.cache(true);

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
				development: process.env.NODE_ENV === "development",
			},
		],
		'@babel/preset-env',
	];

	const plugins = [

	];

	return {
		presets,
		plugins,
	};
}
