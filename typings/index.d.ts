declare type KeysOf<T> = Array<keyof T> extends (infer E)[]
	? E
	: Array<keyof T> extends readonly (infer F)[]
	? F
	: never;

declare module '*.(c|sa|sc|le)ss';
