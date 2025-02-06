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
class TestHostComponent {}

describe('Integration Test MarkerClusterMapComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent],
			providers: [provideRouter([])]
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(fixture.componentInstance).toBeTruthy();
	});
});
