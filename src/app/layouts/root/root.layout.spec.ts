import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrefetchService } from '../../services/prefetch.service';
import { RootLayoutComponent } from './root.layout';

describe('RootLayoutComponent', () => {
	let component: RootLayoutComponent;
	let fixture: ComponentFixture<RootLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RootLayoutComponent, TranslateModule.forRoot()],
			providers: [
				{
					provide: PrefetchService,
					useValue: {
						prefetchIncidents: jest.fn(),
						prefetchStreetGrid: jest.fn(),
					},
				},
				{
					provide: ActivatedRoute,
					useValue: {}
				}
			],
		}).compileComponents();

		fixture = TestBed.createComponent(RootLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
