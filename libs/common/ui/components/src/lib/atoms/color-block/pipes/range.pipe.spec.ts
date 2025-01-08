import { RangePipe } from './range.pipe';
import { EDangerousColors } from '@simra/common-models';

describe('RangePipe', () => {
	let pipe: RangePipe;

	beforeEach(() => {
		pipe = new RangePipe();
	});

	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return single value with ">" prefix for single value range', () => {
		expect(pipe.transform(EDangerousColors.RED_500)).toBe('> 0.5');
	});

	it('should return values joined by " - " for multiple value range', () => {
		expect(pipe.transform(EDangerousColors.ORANGE_500)).toBe('0.25 - 0.5');
	});
});
