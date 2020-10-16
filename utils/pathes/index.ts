import { Helpers } from '../index';
import { scanDir } from './hooks';

export class Pathes {
	staticPathes = {
		app: '',
		entry: '',
		output: Helpers.resolvePath('dist'),
		template: Helpers.resolvePath('public/index.html'),
		packageJson: Helpers.resolvePath('package.json')
	};

	aliases = {};

	constructor (rootDirName: string) {
		
		this.staticPathes.app = Helpers.resolvePath(rootDirName);
		this.aliases[rootDirName] = Helpers.resolvePath(rootDirName);
		this.staticPathes.entry = Helpers.resolvePath(rootDirName, 'index.tsx');
		
		scanDir(this.aliases[rootDirName])
			.map((dir: string) => {
				this.aliases[dir] = Helpers.resolvePath(rootDirName, dir);
			})

		// this.aliases = aliases;
	}
}

const pathes = new Pathes('app');
export default pathes;
