import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileCardComponent } from './profile-card.component';

@Component({
	selector: 't-profile-card-host',
	template: `
		<t-profile-card [groupedProfileSafetyMetrics]="groupedProfileSafetyMetrics"></t-profile-card>`,
	imports: [ProfileCardComponent],
})
class TestHostComponent {
	groupedProfileSafetyMetrics = [];
}
describe('ProfileCardComponent', () => {
	let component: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ProfileCardComponent,

				TranslateModule.forRoot()
			],
			providers: [],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
