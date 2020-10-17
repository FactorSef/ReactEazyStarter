/* eslint-disable @typescript-eslint/no-unsafe-call */
import process from 'process';
import MiniCSSExtract from 'mini-css-extract-plugin';
import { castArray } from 'lodash';

import { RuleSetRule } from 'webpack';
import { LoaderType } from './types';

import presets from './presets';

/**
 * Create a module filename template
 * @param loader The type of styles used in the project
 * @param useCSSModules `true` to get CSSModule names
 */
function castExtension(loader: LoaderType, useCSSModules?: boolean) {
	switch (loader) {
		case 'sass':
			return !useCSSModules ? /\.s[ac]ss$/ : /\.module\.s[ac]ss$/;
		case 'less':
			return !useCSSModules ? /\.less$/ : /\.module\.less$/;
		default:
			return !useCSSModules ? /\.css$/ : /\.module\.css$/;
	}
}

/**
 * Creating a rule for the webpack module
 * @param loader The type of styles used in the project
 * @param useCSSModules `true` if you want to use CSSModules
 */
function castRule(loader: LoaderType, useCSSModules?: boolean): RuleSetRule {
	// Rule object
	const rule = {
		// Include all modules that pass test assertion. See more: https://webpack.js.org/configuration/module/#ruletest
		test: castExtension(loader, useCSSModules),
		// Array a loaders. See more: https://webpack.js.org/configuration/module/#ruleuse
		use: [],
		// Exclude all modules matching any of these conditions. See more: https://webpack.js.org/configuration/module/#ruleexclude
		exclude: castExtension(loader, !useCSSModules),
	}

	// Check production build
	const isProduction = process.env.NODE_ENV === 'production';
	
	// Addition extract or non-extract css loader
	rule.use.push(isProduction ? MiniCSSExtract.loader : 'style-loader');

	// Addition loader for generate .d.ts files for CSSModules
	if (useCSSModules) {
		rule.use.push({
			loader: 'css-modules-typescript-loader',
			options: {
				modules: useCSSModules,
				namedExport: true,
				mode: isProduction ? 'verify' : 'emit'
			},
		});
	}

	// Addition loader for CSS
	rule.use.push({
		loader: 'css-loader',
		options: {
			sourceMap: isProduction,
			modules: useCSSModules && {
				mode: 'local',
				exportGlobals: true,
				localIdentName: !isProduction ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64]',
				exportLocalsConvention: 'camelCaseOnly'
			},
			importLoaders: 0,
		},
	})

	// Addition loader for PostCSS
	rule.use.push({
		loader: 'postcss-loader',
		options: {
			sourceMap: true,
		},
	});

	// Addition loader preset for sass/less or more. See more: ../presets.ts
	if (loader !== 'css') {
		rule.use.push(...castArray(presets[loader](isProduction)))
	}

	// Enables/Disables or setups number of loaders applied before CSS loader. See more: https://webpack.js.org/loaders/css-loader/#importloaders
	if (useCSSModules) {
		(rule.use[2] as { options: { importLoaders: number } }).options.importLoaders = rule.use.length - 3;
	}

	return rule;
}

/**
 * Loaders map for webpack
 * @param loaders The type of styles used in the project
 * @param useCSSModules `true` if you want to use CSSModules
 */
export function mapLoaders(loaders: LoaderType[], useCSSModules?: boolean): RuleSetRule[] {
	const rules: RuleSetRule[] = [];

	loaders.map((loader: LoaderType) => {
		rules.push(castRule(loader))

		if (useCSSModules) {
			rules.push(castRule(loader, useCSSModules))
		}
	})

	return rules;
}

