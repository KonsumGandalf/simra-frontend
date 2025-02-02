import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IncidentIconComponent } from './incident-icon.component';

describe('IconComponent', () => {
	let component: IncidentIconComponent;
	let fixture: ComponentFixture<IncidentIconComponent>;
	let mockToolTips: string[];

	beforeEach(async () => {
		mockToolTips = ['test1', 'test2', 'test3'];

		await TestBed.configureTestingModule({
			imports: [IncidentIconComponent, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(IncidentIconComponent);
		component = fixture.componentInstance;
		component.tooltips = mockToolTips
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
