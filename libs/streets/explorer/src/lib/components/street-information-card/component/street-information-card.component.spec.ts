import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { StreetDetailState } from '@simra/streets-domain';
import { StreetInformationCardComponent } from './street-information-card.component';

describe('StreetInformationComponent', () => {
	let component: StreetInformationCardComponent;
	let fixture: ComponentFixture<StreetInformationCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				StreetInformationCardComponent,
				RouterModule.forRoot([]),
				TranslateModule.forRoot(),
			],
			providers: [
				provideStore([StreetDetailState])
			],
		}).compileComponents();

		fixture = TestBed.createComponent(StreetInformationCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
