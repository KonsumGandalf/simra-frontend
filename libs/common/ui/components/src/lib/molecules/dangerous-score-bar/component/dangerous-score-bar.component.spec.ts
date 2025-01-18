import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngxs/store';
import { MapFilterState } from '@simra/common-state';
import { DangerousScoreBarComponent } from './dangerous-score-bar.component';

describe('DangerousScoreBarComponent', () => {
	let component: DangerousScoreBarComponent;
	let fixture: ComponentFixture<DangerousScoreBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				DangerousScoreBarComponent,

				TranslateModule.forRoot()
			],
			providers: [
				provideStore([MapFilterState])
			]
		}).compileComponents();

		fixture = TestBed.createComponent(DangerousScoreBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
