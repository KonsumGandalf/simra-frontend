import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { StreetDetailViewFacade, StreetListViewFacade } from '@simra/streets-domain';
import { of } from 'rxjs';
import { StreetListViewPage } from './street-list-view.page';

describe('ListViewComponent', () => {
	let component: StreetListViewPage;
	let fixture: ComponentFixture<StreetListViewPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StreetListViewPage, TranslateModule.forRoot()],
			providers: [
				{
					provide: StreetListViewFacade,
					useValue: {
						fetchStreetList: jest.fn().mockReturnValue(of({})),
					},
				},
				{
					provide: StreetDetailViewFacade,
					useValue: {
						getAndSetStreet: jest.fn().mockReturnValue(of({})),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StreetListViewPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
