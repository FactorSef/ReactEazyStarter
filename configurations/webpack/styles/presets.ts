/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export default {
	sass: (isProduction?: boolean) => ([
		{
			loader: 'sass-loader',
			options: { sourceMap: isProduction },
		}
	]),
	less: (isProduction?: boolean) => ([
		{
			loader: 'less-loader',
			options: { sourceMap: isProduction },
		}
	]),
}
