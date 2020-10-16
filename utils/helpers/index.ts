import { cwd } from 'process';
import { resolve } from 'path';
import { toUpper, snakeCase } from 'lodash';

class Helpers {
	static clampEnv(env: string): 'development' | 'production' {
		return env === 'production' ? env : 'development';
	}

	static isProduction(env: string): boolean {
		return this.clampEnv(env) === 'production';
	}

	static getCwdPath(): string {
		return cwd();
	}

	static resolvePath(...pathSegments: string[]): string {
		return resolve(...pathSegments);
	}

	static mapEnv(...keysToMap: string[]): { [key: string]: string } {
		const envMaped: { [key: string]: string } = {};

		keysToMap.map(function (rawKey) {
			const key = toUpper(snakeCase(rawKey));

			envMaped[`process.env.REACT_APP_${key}`] = JSON.stringify(process.env[rawKey])
		})

		return envMaped;
	}

	static map(...args: unknown[]): unknown[] {
		return args.filter(Boolean);
	}
}

export default Helpers;
