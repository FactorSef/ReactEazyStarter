import { cwd } from 'process';
import { resolve } from 'path';
import { toUpper, snakeCase } from 'lodash';

/**
 * Configuration Helpers
 */
class Helpers {
	/**
	 * Limits env to `production` and `development`
	 * @param env `production`, `development` or any string
	 */
	static clampEnv(env: string): 'development' | 'production' {
		return env === 'production' ? env : 'development';
	}

	/**
	 * Checks build mode.
	 * 
	 * return `true` if production
	 * @param env `production`, `development` or any string
	 */
	static isProduction(env: string): boolean {
		return this.clampEnv(env) === 'production';
	}

	/**
	 * Get the path of the project root directory
	 */
	static getCwdPath(): string {
		return cwd();
	}

	/**
	 * Get path relative to the main project directory
	 * @param pathSegments any path string
	 */
	static resolvePath(...pathSegments: string[]): string {
		return resolve(this.getCwdPath(), ...pathSegments);
	}

	/**
	 * Registers process.env [some_paths] for react
	 * 
	 * See more (analog from CRA): https://create-react-app.dev/docs/adding-custom-environment-variables/
	 * @param keysToMap any env pathes
	 */
	static mapEnv(...keysToMap: string[]): { [key: string]: string } {
		const envMaped: { [key: string]: string } = {};

		keysToMap.map(function (rawKey) {
			const key = toUpper(snakeCase(rawKey));

			envMaped[`process.env.REACT_APP_${key}`] = JSON.stringify(process.env[rawKey])
		})

		return envMaped;
	}

	/**
	 * Returns a valid array
	 * @param args any items
	 */
	static map(...args: unknown[]): unknown[] {
		return args.filter(Boolean);
	}
}

export default Helpers;
