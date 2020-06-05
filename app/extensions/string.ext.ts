type StringExtend = Array<string | null | undefined>;

interface String {
	/**
	 * C# format string method
	 * @param args Array arguments
	 */
	format(...args: StringExtend): string;
}

interface StringConstructor {
	/**
	 * C# format string method
	 * @param value String to format
	 * @param args Array arguments
	 */
	format(value: string, ...args: StringExtend): string;
	/**
	 * Генерация произвольного текста
	 * @param countWorlds Кол-во слов
	 * @param truncate Ограничение по кол-ву символов
	 */
	lorem(countWorlds: number, truncate?: number): string;
}

String.prototype.format = function (...args: StringExtend): string {
	return (this as string).replace(/{(\d+)}/g, function (match: string, number: number): string {
		return typeof args[number] !== 'undefined'
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			? (args[number] as string) : '';
	});
};

String.format = (value: string, ...args: StringExtend): string => value.format(...args);

String.lorem = function (countWorlds: number, truncate?: number): string {
	// eslint-disable-next-line no-use-before-define
	const words: string[] = [loremWords[0], loremWords[1]];

	for (let ii = 0; ii < countWorlds; ii++) {
		// eslint-disable-next-line no-use-before-define
		const position: number = Math.floor(Math.random() * loremWords.length);
		// eslint-disable-next-line no-use-before-define
		const word: string = loremWords[position];

		if (ii > 0 && words[ii - 1] === word) {
			ii -= 1;
		} else {
			words[ii] = word;
		}
	}

	const lorem: string = words.join(' ');

	if (truncate && lorem.length > truncate) {
		return lorem.slice(0, truncate);
	}

	return lorem;
};

const loremWords: string[] = [
	'lorem',
	'ipsum',
	'dolor',
	'sit',
	'amet',
	'consectetur',
	'adipiscing',
	'elit',
	'curabitur',
	'vel',
	'hendrerit',
	'libero',
	'eleifend',
	'blandit',
	'nunc',
	'ornare',
	'odio',
	'ut',
	'orci',
	'gravida',
	'imperdiet',
	'nullam',
	'purus',
	'lacinia',
	'a',
	'pretium',
	'quis',
	'congue',
	'praesent',
	'sagittis',
	'laoreet',
	'auctor',
	'mauris',
	'non',
	'velit',
	'eros',
	'dictum',
	'proin',
	'accumsan',
	'sapien',
	'nec',
	'massa',
	'volutpat',
	'venenatis',
	'sed',
	'eu',
	'molestie',
	'lacus',
	'quisque',
	'porttitor',
	'ligula',
	'dui',
	'mollis',
	'tempus',
	'at',
	'magna',
	'vestibulum',
	'turpis',
	'ac',
	'diam',
	'tincidunt',
	'id',
	'condimentum',
	'enim',
	'sodales',
	'in',
	'hac',
	'habitasse',
	'platea',
	'dictumst',
	'aenean',
	'neque',
	'fusce',
	'augue',
	'leo',
	'eget',
	'semper',
	'mattis',
	'tortor',
	'scelerisque',
	'nulla',
	'interdum',
	'tellus',
	'malesuada',
	'rhoncus',
	'porta',
	'sem',
	'aliquet',
	'et',
	'nam',
	'suspendisse',
	'potenti',
	'vivamus',
	'luctus',
	'fringilla',
	'erat',
	'donec',
	'justo',
	'vehicula',
	'ultricies',
	'varius',
	'ante',
	'primis',
	'faucibus',
	'ultrices',
	'posuere',
	'cubilia',
	'curae',
	'etiam',
	'cursus',
	'aliquam',
	'quam',
	'dapibus',
	'nisl',
	'feugiat',
	'egestas',
	'class',
	'aptent',
	'taciti',
	'sociosqu',
	'ad',
	'litora',
	'torquent',
	'per',
	'conubia',
	'nostra',
	'inceptos',
	'himenaeos',
	'phasellus',
	'nibh',
	'pulvinar',
	'vitae',
	'urna',
	'iaculis',
	'lobortis',
	'nisi',
	'viverra',
	'arcu',
	'morbi',
	'pellentesque',
	'metus',
	'commodo',
	'ut',
	'facilisis',
	'felis',
	'tristique',
	'ullamcorper',
	'placerat',
	'aenean',
	'convallis',
	'sollicitudin',
	'integer',
	'rutrum',
	'duis',
	'est',
	'etiam',
	'bibendum',
	'donec',
	'pharetra',
	'vulputate',
	'maecenas',
	'mi',
	'fermentum',
	'consequat',
	'suscipit',
	'aliquam',
	'habitant',
	'senectus',
	'netus',
	'fames',
	'quisque',
	'euismod',
	'curabitur',
	'lectus',
	'elementum',
	'tempor',
	'risus',
	'cras',
];
