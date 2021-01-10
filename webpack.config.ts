import { ConfigOptions } from './webpack/types';
import makeConfig from './webpack/webpack.config.base';
import { productionSettings, useSettings } from './settings';

const configOptions: ConfigOptions = {
	mode: 'production',
	entryFile: 'app/index.tsx',
	outputDir: 'dist',
};

if (configOptions.mode === 'production') {
	useSettings(productionSettings); // set production env
} else {
	useSettings(); // set base env
}

export default makeConfig(configOptions);
