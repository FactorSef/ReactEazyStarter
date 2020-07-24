module.exports = {
	icon: true,
	typescript: true,
	expandProps: 'end',
	prettier: false,
	svgo: true,
	titleProp: true,
	ext: 'tsx',
	template: require('./template.svgr.js'),
	plugins: ['@svgr/plugin-jsx'],
	svgProps: {
		width: 1em,
		height: 1em,
	},
};
