import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IncidentIconComponent } from './incident-icon.component';

describe('IconComponent', () => {
	let component: IncidentIconComponent;
	let fixture: ComponentFixture<IncidentIconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IncidentIconComponent, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(IncidentIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
