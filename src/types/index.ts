export interface Theme {
	id: string;
	label: string;
	color: string;
}

export interface Language {
	id: string;
	label: string;
	logoPath: string;
	monacoLanguage: string;
	defaultCode: string;
	pistonRuntime: LanguageRuntime;
}

export interface LanguageRuntime {
	language: string;
	version: string;
}