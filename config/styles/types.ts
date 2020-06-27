export type StyleType = 'css' | 'sass' | 'less';

export interface StylesOptions {
	/**
	 * Module Type
	 */
	type: StyleType;
	/**
	 * Set `true` to use CSSModules
	 */
	modules?: boolean;
}

export interface RuleOptions {
	/**
	 * module ext section
	 */
	test: RegExp;
	/**
	 * loaders section
	 */
	use: Array<any>;
	/**
	 * Exclude module section
	 */
	exclude?: RegExp;
}
