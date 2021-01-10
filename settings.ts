export const productionSettings = {
	CSSMODULES_MODE: 'verify',
};

export const defaultSettings = {
	CSSMODULES_MODE: 'emit',
};

export function useSettings(
	settings?: { [key: string]: string },
	replace?: boolean
): void {
	const _settings = replace
		? settings
		: Object.assign({}, defaultSettings, settings);

	Object.keys(_settings).map((key) => {
		process.env[key] = _settings[key];
	});
}
