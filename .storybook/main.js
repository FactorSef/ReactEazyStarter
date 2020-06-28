const process = require('process');
const path = require('path');
const getStyleRules = require('./styleRules').getStyleRules;

module.exports = {
	stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.[tj]sx', '../stories/**/*.stories.mdx', '../stories/**/*.stories.[tj]sx'],
	addons: [
		'@storybook/addon-actions/register',
		'@storybook/addon-docs',
		'@storybook/addon-knobs/register',
		'@storybook/addon-links/register',
		'@storybook/addon-notes/register',
		'@storybook/preset-typescript',
	],
	webpackFinal: (config) => {
		config.resolve.extensions.push('.svg', '.scss', '.sass', '.less');
		config.module.rules[0].use.push(require.resolve('ts-loader'), {
			loader: require.resolve('react-docgen-typescript-loader'),
			options: {
				tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
			},
		});

		config.module.rules.push({
			test: /\.tsx?$/,
			include: path.resolve(__dirname, '../src'),
			use: [
				require.resolve('ts-loader'),
				{
					loader: require.resolve('react-docgen-typescript-loader'),
					options: {
						// Provide the path to your tsconfig.json so that your stories can
						// display types from outside each individual story.
						tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
					},
				},
			],
		});
		config.module.rules.push(
			// ...getStyleRules({ type: 'css', modules: true }),
			...getStyleRules({ type: 'sass', modules: true }),
			...getStyleRules({ type: 'less', modules: true }),
		);
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.[jt]s(x)?$/,
			},
			use: [
				{
					loader: '@svgr/webpack',
				},
			],
		});
		return config;
	},
};
