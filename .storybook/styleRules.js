var MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getExt(type, modules = false) {
	switch (type) {
		case 'sass':
			return !modules ? /\.s[ac]ss$/ : /\.module\.s[ac]ss$/;
		case 'less':
			return !modules ? /\.less$/ : /\.module\.less$/;
		default:
			return !modules ? /\.css$/ : /\.module\.css$/;
	}
}

function mapRule(rule, options) {
	rule.use.push('style-loader');

	if (options.modules) {
		rule.use.push({
			loader: 'css-modules-typescript-loader',
			options: {
				modules: options.modules,
				namedExport: true,
			},
		});
	}

	rule.use.push({
		loader: 'css-loader',
		options: {
			sourceMap: true,
			localsConvention: options.modules ? 'camelCaseOnly' : 'asIs',
			modules: options.modules && {
				mode: 'local',
				exportGlobals: true,
				localIdentName: !true ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64]',
			},
		},
	});

	switch (options.type) {
		case 'sass': {
			rule.use.push({
				loader: 'sass-loader',
				options: { sourceMap: true },
			});
			break;
		}
		case 'less': {
			rule.use.push({
				loader: 'less-loader',
				options: { sourceMap: true },
			});
			break;
		}
		default:
			break;
	}

	rule.use.push({
		loader: 'postcss-loader',
		options: {
			sourceMap: true,
		},
	});

	rule.test = getExt(options.type, options.modules);

	if (!options.modules) {
		rule.exclude = getExt(options.type, true);
	}

	return rule;
}

function getStyleRules(options) {
	const rules = [];

	rules.push(
		mapRule(
			{
				test: getExt(options.type, false),
				use: [],
			},
			{ ...options, modules: false },
		),
	);

	if (options.modules) {
		rules.push(
			mapRule(
				{
					test: getExt(options.type, true),
					use: [],
				},
				options,
			),
		);
	}

	return rules;
}

module.exports = { getStyleRules };
