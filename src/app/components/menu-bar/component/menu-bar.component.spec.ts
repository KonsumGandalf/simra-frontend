import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrefetchService } from '../../../services/prefetch.service';
import { MenuBarComponent } from './menu-bar.component';

describe('MenuBarComponent', () => {
	let component: MenuBarComponent;
	let fixture: ComponentFixture<MenuBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MenuBarComponent, TranslateModule.forRoot()],
			providers: [
				{
					provide: PrefetchService,
					useValue: {
						prefetchIncidents: jest.fn(),
						prefetchStreetGrid: jest.fn(),
					},
				},
				{
					provide: ActivatedRoute,
					useValue: {}
				}
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MenuBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
