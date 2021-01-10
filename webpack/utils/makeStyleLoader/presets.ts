/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RuleSetUseItem } from 'webpack';
import { getExist } from '../helpers';
import { PresetsList } from './types';

function getStyleLoader(isProduction: boolean): RuleSetUseItem {
	return isProduction ? 'style-loader' : 'style-loader';
}

function CSS(
	isProduction: boolean,
	importLoaders: number,
	useCSSModules?: boolean
): Array<RuleSetUseItem> {
	return getExist(
		useCSSModules && {
			loader: 'css-modules-typescript-loader',
			options: {
				modules: true,
				namedExport: true,
				mode: process.env.CSSMODULES_MODE, // check `settings.ts` and your webpack.config in root directory
			},
		},
		{
			loader: 'css-loader',
			options: {
				sourceMap: true,
				modules: useCSSModules && {
					mode: 'local',
					exportGlobals: true,
					localIdentName: !isProduction
						? '[path][name]-[local]-[hash:base64:5]'
						: '[hash:base64]',
					exportLocalsConvention: 'camelCaseOnly',
				},
				importLoaders,
			},
		}
	);
}

/**
 * all defined styleloader presets
 * @param useCSSModules if `true` then a loader for CSSModules will be added
 */
export default function (useCSSModules?: boolean): PresetsList {
	const isProduction = process.env.NODE_ENV === 'production';

	return {
		css: {
			test: '.css$',
			use: [
				getStyleLoader(isProduction),
				...CSS(isProduction, 1, useCSSModules),
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},
		sass: {
			test: '.(c|sa|sc)ss$',
			use: [
				getStyleLoader(isProduction),
				...CSS(isProduction, 1, useCSSModules),
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
					},
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},
		less: {
			test: '.less$',
			use: [
				getStyleLoader(isProduction),
				...CSS(isProduction, 1, useCSSModules),
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
					},
				},
				{
					loader: 'less-loader',
					options: {
						sourceMap: true,
					},
				},
			],
		},
	};
}
