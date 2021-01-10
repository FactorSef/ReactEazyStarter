import { RuleSetRule } from 'webpack';
import { Preset } from './types';

export function presetParser(preset: Preset): RuleSetRule {
	const rule: RuleSetRule = {
		test: new RegExp(preset.test),
		exclude: new RegExp('.module'.concat(preset.test)),
		use: preset.use,
	};

	return rule;
}

export function presetParserIncludeCSSModules(preset: Preset): RuleSetRule {
	const rule: RuleSetRule = {
		test: new RegExp('.module'.concat(preset.test)),
		use: preset.use,
	};

	return rule;
}
