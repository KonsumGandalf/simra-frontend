import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FallbackValueDirective } from './fallback-value.directive';

describe('FallbackValueDirective', () => {
	let directive: FallbackValueDirective;
	let mockElementRef: ElementRef;
	let mockRenderer: Partial<Renderer2>;

	beforeEach(() => {
		mockElementRef = {
			nativeElement: {}
		}

		mockRenderer = {
			addClass: jest.fn()
		}

		TestBed.configureTestingModule({
			providers: [
				FallbackValueDirective,

				{
					provide: ElementRef,
					useValue: mockElementRef
				},
				{
					provide: Renderer2,
					useValue: mockRenderer
				}
			],
			imports: [TranslateModule.forRoot()],
		})

		directive = TestBed.inject(FallbackValueDirective);
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});
});
