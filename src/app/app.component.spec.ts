import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PrefetchService } from './services/prefetch.service';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent, RouterModule.forRoot([]), TranslateModule.forRoot()],
			providers: [
				{
					provide: PrefetchService,
					useValue: {
						prefetchIncidents: jest.fn(),
						prefetchStreetGrid: jest.fn(),
					},
				}
			],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
