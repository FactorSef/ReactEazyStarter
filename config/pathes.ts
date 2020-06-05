import path from 'path';
import fs from 'fs';

const mainDir = fs.realpathSync(process.cwd());

const resolvePath = (relativePath: string): string => path.resolve(mainDir, relativePath);

export { resolvePath };

export default {
	mainDir,
	packageJson: resolvePath('package.json'),
	appDir: resolvePath('app'),
	appEntry: resolvePath('app/index.tsx'),
	outputDir: resolvePath('dist'),
	template: resolvePath('public/index.html'),
};
