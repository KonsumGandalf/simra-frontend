import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MapPage } from './map.page';
import { Component } from '@angular/core';

@Component({
	selector: 't-map-host',
	template: `
		<t-map-componenent></t-map-componenent>`,
	imports: [MapPage],
})
class TestHostComponent {
}

describe('Integration Test MapComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				TestHostComponent,

				TranslateModule.forRoot()
			],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
