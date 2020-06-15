/* eslint-disable */

export default (useModules: boolean = false, isProduction: boolean = false) => ([
	useModules && {
		loader: 'css-modules-typescript-loader', options: {
			modules: useModules,
			namedExport: true
		}
	},
	useModules && {
		loader: 'css-loader',
		options: {
			localsConvention: 'camelCaseOnly',
			modules: {
				mode: 'local',
				exportGlobals: true,
				localIdentName: !isProduction
					? '[path][name]__[local]--[hash:base64:5]'
					: '[hash:base64]',
			},
			importLoaders: 3,
			sourceMap: isProduction,
		}
	},
	!useModules && {
		loader: 'css-loader',
		options: {
			importLoaders: 3,
			sourceMap: isProduction,
		}
	}
].filter(Boolean));
