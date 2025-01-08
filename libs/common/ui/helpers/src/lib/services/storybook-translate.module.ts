import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IModuleTranslationOptions, ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export function httpLoaderFactory(http: HttpClient) {
	const baseTranslateUrl = 'http://localhost:4400/assets/i18n';

	const options: IModuleTranslationOptions = {
		modules: [
			{
				baseTranslateUrl,
				moduleName: 'components',
				pathTemplate: 'http://localhost:4400/assets/i18n/common/ui/components/de'
			}
		],
	};

	return new ModuleTranslateLoader(http, options);
}

@NgModule({
	imports: [
		HttpClientModule,

		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
	exports: [TranslateModule],
})
export class StorybookTranslateModule {
	constructor(translateService: TranslateService) {
		translateService.setDefaultLang('de');
		translateService.use('de');
	}
}
