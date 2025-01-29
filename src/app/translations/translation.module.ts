import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { IModuleTranslationOptions, ModuleTranslateLoader } from '@larscom/ngx-translate-module-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export function moduleHttpLoaderFactory(http: HttpClient) {
	const baseTranslateUrl = './assets/i18n';

	const options: IModuleTranslationOptions = {
		modules: [
			{
				baseTranslateUrl,
				moduleName: 'components',
				pathTemplate: '{baseTranslateUrl}/common/ui/components/{language}',
			},
			{
				baseTranslateUrl,
				moduleName: 'streets.map',
				pathTemplate: '{baseTranslateUrl}/streets/map/{language}',
			},
			{
				baseTranslateUrl,
				moduleName: 'incidents.ui',
				pathTemplate: '{baseTranslateUrl}/incidents/ui/{language}',
			},
		],
	};

	return new ModuleTranslateLoader(http, options);
}

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,

		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: moduleHttpLoaderFactory,
				deps: [ HttpClient ]
			}
		})
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: () => {
				const translateService = inject(TranslateService);
				return () => {
					translateService.setDefaultLang('de');
					translateService.use(navigator.language.substring(0, 2));
				};
			},
			multi: true
		}
	],
	exports: [ TranslateModule ]
})
export class AppTranslationModule {

}

