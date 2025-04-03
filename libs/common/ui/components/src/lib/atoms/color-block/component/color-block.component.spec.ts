import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ColorBlockComponent } from './color-block.component';

describe('ColorBlockComponent', () => {
	let component: ColorBlockComponent;
	let fixture: ComponentFixture<ColorBlockComponent>;
	let componentRef: ComponentRef<ColorBlockComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ColorBlockComponent,

				TranslateModule.forRoot(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ColorBlockComponent);
		component = fixture.componentInstance;
		componentRef = fixture.componentRef;
		componentRef.setInput('color', 'color');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
