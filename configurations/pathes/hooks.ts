import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * This method returns all folders inside the directory
 * @param path path to scan directory
 */
export function scanDir(path: string): string[] {
	if (!existsSync(path)) {
		console.warn(`File or folder does not exist: ${path}`);
		return [];
	}

	return readdirSync(path)
		.filter(function (val: string) {
			return statSync(join(path, val))
				.isDirectory()
		});
}

