import { RuleSetRule } from 'webpack';
import { resolvePath } from '../paths';
import { presetParser, presetParserIncludeCSSModules } from './presetParser';
import presets from './presets';

/**
 * Builds a ready-made style loader
 * @description you need add some presets to [root]/webpack/utils/makeStyleLoader/presets.ts in default export function
 * @param preset preset name (`css` | `scss` | `less`)
 * @param includeCSSModules include CSSModules loader
 */
function makeStyleLoaders(
	preset: string,
	includeCSSModules?: boolean
): Array<RuleSetRule> {
	try {
		const presetRule = presets(includeCSSModules)[preset];

		if (presetRule) {
			const parser = includeCSSModules
				? presetParserIncludeCSSModules
				: presetParser;

			return [parser(presetRule)];
		} else {
			throw new Error(
				`Preset '${preset}' not found, please check presets object in '${resolvePath(
					'webpack/utils/makeStyleLoader/presets.ts'
				)}'`
			);
		}
	} catch (error) {
		console.error(error);
	}
}

export default makeStyleLoaders;
