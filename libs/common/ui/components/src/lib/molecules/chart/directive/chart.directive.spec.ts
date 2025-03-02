import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { UIChart } from 'primeng/chart';
import { ChartDirective } from './chart.directive';

describe('ChartDirective', () => {
	let directive: ChartDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot()],
			providers: [
				{ provide: UIChart, useValue: {} },
				ChartDirective
			]
		});

		directive = TestBed.inject(ChartDirective);
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});
});
