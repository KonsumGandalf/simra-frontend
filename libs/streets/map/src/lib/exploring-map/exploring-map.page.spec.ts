import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploringMapPage } from './exploring-map.page';

describe('ExploringMapComponent', () => {
	let component: ExploringMapPage;
	let fixture: ComponentFixture<ExploringMapPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ExploringMapPage],
		}).compileComponents();

		fixture = TestBed.createComponent(ExploringMapPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
