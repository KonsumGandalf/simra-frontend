import { ElementRef, Injector, input, Renderer2, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { delay } from '@simra/helpers';
import { StatusIconDirective } from './status-icon.directive';

describe('StatusIconDirective', () => {
	let directive: StatusIconDirective;
	let mockElementRef: ElementRef;
	let mockRenderer: Partial<Renderer2>;
	let injector: Injector;

	beforeEach(() => {
		mockElementRef = {
			nativeElement: {}
		}

		mockRenderer = {
			addClass: jest.fn()
		}

		TestBed.configureTestingModule({
			providers: [
				StatusIconDirective,

				{
					provide: ElementRef,
					useValue: mockElementRef
				},
				{
					provide: Renderer2,
					useValue: mockRenderer
				}
			],
		})

		injector = TestBed.inject(Injector);
		directive = TestBed.inject(StatusIconDirective);
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should add class ph-check-circle if status is true', async () => {
		runInInjectionContext(injector, () => {
			directive.status = input(true);
		});
		await delay(5);
		expect(mockRenderer.addClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'ph-check-circle');
	});

	it('should add class ph-x-circle if status is false', async () => {
		runInInjectionContext(injector, () => {
			directive.status = input(false);
		});
		await delay(5);
		expect(mockRenderer.addClass).toHaveBeenCalledWith(mockElementRef.nativeElement, 'ph-x-circle');
	});
});
