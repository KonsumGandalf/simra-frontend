import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LastRunComponent } from './last-run.component';

@Component({
	selector: 'a-lst-updated-component',
	template: '<a-last-run [date]="lastRun"></a-last-run>',
	imports: [LastRunComponent],
})
class TestHostComponent {
	lastRun = new Date()
}
describe('Integration Test LastRunComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent, TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
