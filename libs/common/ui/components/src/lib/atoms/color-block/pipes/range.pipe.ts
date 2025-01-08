import { Pipe, PipeTransform } from '@angular/core';
import { EDangerousColors } from '@simra/common-models';
import { DangerousColorToScoreRange } from '../maps/dangerous-color-to-score-range';

@Pipe({
	standalone: true,
	name: 'rangePipe',
})
export class RangePipe implements PipeTransform {
	transform(color: EDangerousColors): string {
		const scoreRange = DangerousColorToScoreRange[color];
		if (!scoreRange) {
			return '';
		}
		return scoreRange.length > 1 ? scoreRange.join(' - ') : `> ${scoreRange[0]}`;
	}
}
