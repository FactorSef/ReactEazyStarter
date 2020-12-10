import path from 'path';

/**
 * Returns the full path, relative to the process.cwd()
 * @param pathSegments string paths to join. Non-string arguments are ignored.
 */
export function resolvePath(...pathSegments: string[]): string {
	return path.resolve(process.cwd(), ...pathSegments);
}
