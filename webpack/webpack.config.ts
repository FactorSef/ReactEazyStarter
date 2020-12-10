import { Configuration, HotModuleReplacementPlugin } from 'webpack';

// Webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// Utils
import { resolvePath } from './utils/paths';

const webpackConfig: Configuration = {
	entry: {
		app: resolvePath('app/index.tsx'),
	},
	output: {
		path: resolvePath('dist'),
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
	},
	module: {
		rules: [
			{
				test: /\.[jt]s(x)?$/, // check js, ts, jsx or tsx files
				exclude: /node_modules/,
				use: [ 'babel-loader' ],
			},
			{
				test: /\.(s)?[ac]ss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolvePath('public/index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new HotModuleReplacementPlugin(),
	],
};

export default webpackConfig;
