import { cwd } from 'process';
import { resolve } from 'path';
import { toUpper, snakeCase } from 'lodash';

class Helpers {
	static clampEnv(env: string) {
		return env === 'production' ? env : 'development';
	}

	static isProduction(env: string) {
		return this.clampEnv(env) === 'production';
	}

	static getCwdPath() {
		return cwd();
	}

	static resolvePath(...pathSegments: string[]) {
		return resolve(...pathSegments);
	}

	static mapEnv(...keysToMap: string[]) {
		const envMaped: { [key: string]: string } = {};

		keysToMap.map(function (rawKey) {
			const key = toUpper(snakeCase(rawKey));

			envMaped[`process.env.REACT_APP_${key}`] = JSON.stringify(process.env[rawKey])
		})

		return envMaped;
	}

	static map(...args: string[]) {
		return args.filter(Boolean) as [string, ...string[]];
	}
}

export default Helpers;
