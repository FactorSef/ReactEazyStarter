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

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
	const value: SvgrComponent;
	export default value;
}
