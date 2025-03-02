import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { StreetDetailState } from '@simra/streets-domain';
import { IncidentListComponent } from './incident-list.component';

describe('IncidentListComponent', () => {
	let component: IncidentListComponent;
	let fixture: ComponentFixture<IncidentListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				IncidentListComponent,
				RouterModule.forRoot([]),
				TranslateModule.forRoot(),
			],
			providers: [
				provideStore([StreetDetailState])
			]
		}).compileComponents();

		fixture = TestBed.createComponent(IncidentListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
