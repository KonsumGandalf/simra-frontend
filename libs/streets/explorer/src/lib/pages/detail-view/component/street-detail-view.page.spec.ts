import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { StreetDetailState, StreetDetailViewFacade } from '@simra/streets-domain';
import { of } from 'rxjs';
import { StreetAnalyticsService } from '../../../services/street-analytics.service';
import { StreetDetailViewPage } from './street-detail-view.page';

describe('StreetDetailViewPage', () => {
	let component: StreetDetailViewPage;
	let fixture: ComponentFixture<StreetDetailViewPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StreetDetailViewPage, TranslateModule.forRoot()],
			providers: [
				{
					provide: StreetDetailViewFacade,
					useValue: {
						getAndSetStreet: jest.fn().mockReturnValue(of({})),
						fetchLastMethodRun: jest.fn().mockReturnValue(of(new Date())),
					}
				},
				{
					provide: StreetAnalyticsService,
					useValue: {
						calculateSafetyMetrics: jest.fn().mockReturnValue(of(undefined)),
					}
				},
				{
					provide: ActivatedRoute,
					useValue: {
						queryParams: of({})
					},
				},
				provideStore([StreetDetailState])
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StreetDetailViewPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
