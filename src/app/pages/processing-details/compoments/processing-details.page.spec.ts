import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProcessingDetailsPage } from './processing-details.page';

describe('ProcessingDetailsPageComponent', () => {
	let component: ProcessingDetailsPage;
	let fixture: ComponentFixture<ProcessingDetailsPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProcessingDetailsPage, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(ProcessingDetailsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
