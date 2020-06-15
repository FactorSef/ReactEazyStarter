module.exports = {
	endOfLine: 'lf',
	tabWidth: 4,
	useTabs: true,
	overrides: [
		{
			files: ['*.js', '*.jsx'],
			options: {
				trailingComma: 'es5',
				semi: true,
				singleQuote: true,
				trailingComma: 'all',
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			options: {
				parser: 'typescript',
				trailingComma: 'es5',
				semi: true,
				singleQuote: true,
				trailingComma: 'all',
			},
		},
		{
			files: ['*.less'],
			options: {
				parser: 'less',
			},
		},
		{
			files: ['*.sass', '*.scss'],
			options: {
				parser: 'scss',
			},
		},
		{
			files: ['*.json'],
			options: {
				parser: 'json',
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
