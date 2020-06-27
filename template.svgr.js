/**
 * Template for React SVG
 *
 * Converts the given SVG into a TypeScript-compatible React component
 *
 * @see https://www.smooth-code.com/open-source/svgr/docs/typescript/
 * @see https://github.com/smooth-code/svgr
 */
function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
	const typeScriptTpl = template.smart({ plugins: ['typescript', 'jsx'] });

	return typeScriptTpl.ast`
		import React from 'react';

		const ${componentName} = ({ title, titleId, ...props }) => {
			const icon = ${jsx};
			return (
				<span className="icon">
					{icon}
				</span>
			);
		};

		export default ${componentName};
	`;
}

module.exports = template;
