import { ChangeDetectionStrategy, Component, effect, inject, model, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { EDangerousColors, ETrafficTimes, EWeekDays } from '@simra/common-models';
import { UpdateFilterOptions } from '@simra/common-state';
import { transformMapToList } from '@simra/common-utils';
import { first } from 'lodash';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Popover } from 'primeng/popover';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Tooltip } from 'primeng/tooltip';
import { ColorBlockComponent } from '../../../atoms/color-block/component/color-block.component';
import { TranslationInterface } from '../../../translations/interfaces/translation.interface';
import { TRAFFIC_TIMES_TO_TRANSLATION } from '../../../translations/maps/traffic-times-to-translation';
import { WEEK_DAYS_TO_TRANSLATION } from '../../../translations/maps/week-days-to-translation';

/**
 * This component indicates the coloring of the map and allows to filter
 */
@Component({
    selector: 'm-dangerous-score-bar',
    imports: [
        CommonModule,
        ColorBlockComponent,
        SelectButton,
        FormsModule,
        Button,
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
    }
})
export class DangerousScoreBarComponent {
	private readonly _store = inject(Store);

	protected readonly EDangerousColors = EDangerousColors;
	protected readonly _allTrafficTimes = transformMapToList(TRAFFIC_TIMES_TO_TRANSLATION);
	/**
	 * Indicates which traffic time is selected to filter on the map
	 *
	 * @protected
	 */
	protected _selectedTrafficTime = model<TranslationInterface & {key: ETrafficTimes}>();

	protected readonly _allWeekDays = transformMapToList(WEEK_DAYS_TO_TRANSLATION);
	/**
	 * Contains all selected weekdays
	 *
	 * @protected
	 */
	protected _selectedWeekDays = model<TranslationInterface & {key: EWeekDays}[]>();

	constructor() {
		effect(() => {
			const selectedWeekDays = this._selectedWeekDays();

			let weekDay: EWeekDays | undefined;
			if (!selectedWeekDays || selectedWeekDays?.length === 0 || selectedWeekDays?.length === 2) {
				weekDay = EWeekDays.ALL_WEEK;
			} else {
				weekDay = first(selectedWeekDays)?.key;
			}

			this._store.dispatch(new UpdateFilterOptions({
				trafficTime: this._selectedTrafficTime()?.key,
				weekDay: weekDay
			}));
		})
	}
}
