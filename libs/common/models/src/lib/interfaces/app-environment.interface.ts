import { ESLint } from 'eslint';
import Environment = ESLint.Environment;

export interface AppEnvironmentInterface extends Environment {
	production: boolean;
	apiUrl: string;
	mapillaryUrl: string;
	mapillaryAccessToken: string;
	mapTilerToken: string;
}
