import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AboutPage } from './about.page';

describe('AboutTheInitiativeComponent', () => {
	let component: AboutPage;
	let fixture: ComponentFixture<AboutPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AboutPage, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(AboutPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
