import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MarkerClusterMapPage } from './marker-cluster-map.page';

@Component({
	selector: 't-map-host',
	template: `
		<t-marker-cluster-map-page [markers]="[]"></t-marker-cluster-map-page>`,
	standalone: true,
	imports: [MarkerClusterMapPage],
})
class TestHostPage {}

describe('Integration Test MarkerClusterMapComponent', () => {
	let fixture: ComponentFixture<TestHostPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostPage],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostPage);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
