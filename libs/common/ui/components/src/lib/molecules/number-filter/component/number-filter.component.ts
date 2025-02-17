import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';

@Component({
	selector: 'm-number-filter',
	imports: [CommonModule, TranslatePipe, FormsModule, TableModule],
	templateUrl: './number-filter.component.html',
	styleUrl: './number-filter.component.scss',
	host: {
		class: 'm-number-filter',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFilterComponent {
	@Output() filterChange = new EventEmitter<Record<string, number>>();
	field = input.required<string>();
	step = input<number>(1);
	min = input<number>(0);
	defaultValue = input<number>(0);

	onFilterChange(eventTarget: EventTarget) {
		const minFieldName = 'min' + this.field().charAt(0).toUpperCase() + this.field().slice(1);
		this.filterChange.emit({ [minFieldName]: +(eventTarget as HTMLInputElement).value });
	}
}
