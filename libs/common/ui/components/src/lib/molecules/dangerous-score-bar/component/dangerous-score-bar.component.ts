import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { EDangerousColors } from '@simra/common-models';
import { transformMapToList } from '@simra/common-utils';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Popover } from 'primeng/popover';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Tooltip } from 'primeng/tooltip';
import { ButtonDarkModeComponent } from '../../../atoms/button-dark-mode/component/button-dark-mode.component';
import { ColorBlockComponent } from '../../../atoms/color-block/component/color-block.component';
import { TrafficTimesToLabels } from '../models/maps/traffic-times-to-labels';
import { WeekDaysToLabels } from '../models/maps/week-days-to-labels';

/**
 * This component indicates the coloring of the map and allows to filter
 */
@Component({
	selector: 'm-dangerous-score-bar',
	standalone: true,
	imports: [
		CommonModule,
		ColorBlockComponent,
		SelectButton,
		FormsModule,
		Button,
		ButtonDarkModeComponent,
		Card,
		Select,
		Popover,
		TranslatePipe,
		Tooltip,
	],
	templateUrl: './dangerous-score-bar.component.html',
	styleUrl: './dangerous-score-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'm-dangerous-score-bar',
	},
})
export class DangerousScoreBarComponent {
	protected readonly EDangerousColors = EDangerousColors;
	protected readonly _allTrafficTimes = transformMapToList(TrafficTimesToLabels);
	/**
	 * Indicates which traffic time is selected to filter on the map
	 *
	 * @protected
	 */
	protected _selectedTrafficTime = this._allTrafficTimes[0];

	protected readonly _allWeekDays = transformMapToList(WeekDaysToLabels);
	/**
	 * Contains all selected weekdays
	 *
	 * @protected
	 */
	protected _selectedWeekDay = [];
}
