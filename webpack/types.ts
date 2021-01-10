/**
 * This object is used to set parameters for additional configuration parameters
 */
interface ConfigOptions {
	/**
	 * Specifies an explicit NODE_ENV value
	 */
	mode: 'development' | 'production';
	/**
	 * The path to the entry point, relative to process.cwd()
	 */
	entryFile: string;
	/**
	 * Path to output point, relative to process.cwd()
	 */
	outputDir: string;
}

export type { ConfigOptions };
