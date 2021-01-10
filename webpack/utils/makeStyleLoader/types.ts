import { RuleSetUse } from 'webpack';

interface Preset {
	test: string;
	use: RuleSetUse;
}

interface PresetsList {
	[key: string]: Preset;
}

export type { Preset, PresetsList };
