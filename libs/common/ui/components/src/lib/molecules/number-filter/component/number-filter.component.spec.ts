import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NumberFilterComponent} from './number-filter.component';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'm-test-host-component',
	template: '<p-table #dt [value]="[]"><ng-template pTemplate="header"><m-number-filter [field]="field"></m-number-filter></ng-template></p-table>',
	imports: [NumberFilterComponent, TableModule, FormsModule],
})
class TestHostComponent {
	field = 'field';
}
describe('Integration Test NumberFilterComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				TestHostComponent,

				TranslateModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
