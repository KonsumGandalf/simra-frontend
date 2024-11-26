import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExploringMapComponent } from './exploring-map.component';

describe('ExploringMapComponent', () => {
  let component: ExploringMapComponent;
  let fixture: ComponentFixture<ExploringMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploringMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploringMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
