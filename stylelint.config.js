module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-rational-order',
	],
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	rules: {
		"plugin/declaration-block-no-ignored-properties": true, // https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties

		'color-no-invalid-hex': true, // Запрет недопустимых HEX цветов

		'font-family-no-duplicate-names': true, // Запрет дубликатов имен шрифтов
		'font-family-no-missing-generic-family-keyword': true, // Запрет отсутсвующих родовых семейст шрифтов

		'function-calc-no-invalid': true, // Запрет недопустимое выражение в функциях calc
		'function-calc-no-unspaced-operator': true, // Запрет операторов без пробелов в функциях calc
		'function-linear-gradient-no-nonstandard-direction': true, // Запрет значений направления в вызовах in linear-gradient(), которые недопустимы в соответствии со стандартным синтаксисом

		'string-no-newline': true, // Запрет не экранирования перевода строк

		'unit-no-unknown': true, // Запрет неизвестных юнитов (only px, %, em and others)
		'property-no-unknown': true, // Запрет неизвесных свойств

		'keyframe-declaration-no-important': true, // Запрет !important в блока @keyframe

		'declaration-block-no-duplicate-properties': true, // Запрет дублирования свойств
		'declaration-block-no-shorthand-property-overrides': true, // Запрет сокращенных свойств перед расширеными

		'block-no-empty': true, // Запрет пустых блоков

		'selector-pseudo-class-no-unknown': true, // Запрет неизвестных псевдо-классов
		'selector-pseudo-element-no-unknown': true, // Запрет неизвестных псевдо-элементов
		'selector-type-no-unknown': true, // Запрет неизвестных селекторов

		'media-feature-name-no-unknown': true, // Запрет неизвестных имен медиа функций
		'at-rule-no-unknown': true, // Запрет неизвестных правил

		'comment-no-empty': true, // Запрет пустых комментариев
	},
};
