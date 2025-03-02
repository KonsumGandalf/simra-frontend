import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TTranslationMap } from '../../../translations/interfaces/translation-map.type';
import { EnumSelectButtonComponent } from './enum-select-button.component';

@Component({
	selector: 'm-test-host-component',
	template:
		'<m-enum-select-button [translationMap]="translationMap" [optionEnum]="optionEnum"></m-enum-select-button>',
	imports: [EnumSelectButtonComponent],
})
class TestHostComponent {
	translationMap: TTranslationMap<string> = {
		key1: { label: 'label1' },
		key2: { label: 'label2' },
	};
	optionEnum = { key1: 'value1', key2: 'value2' };
}
describe('Integration Test EnumSelectComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				TestHostComponent,

				TranslateModule.forRoot()
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
