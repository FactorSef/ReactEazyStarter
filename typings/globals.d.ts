declare module '*.module.sass' {
	const resource: { [key: string]: string };
	export = resource;
}
declare module '*.sass';

declare module '*.module.scss' {
	const resource: { [key: string]: string };
	export = resource;
}
declare module '*.scss';

declare module '*.module.less' {
	const resource: { [key: string]: string };
	export = resource;
}
declare module '*.less';

declare module '*.svg' {
	import * as React from 'react';

	type Props = {
		title?: string;
		titleId?: string;
	} & React.SVGProps<SVGSVGElement>;

	function SvgrComponent({ title, titleId, ...props }: Props): JSX.Element;

	export default SvgrComponent;
}
