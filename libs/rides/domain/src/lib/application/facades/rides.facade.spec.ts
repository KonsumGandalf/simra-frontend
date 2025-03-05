import { TestBed } from '@angular/core/testing';

import { RidesFacade } from './rides.facade';

describe('RidesFacade', () => {
  let service: RidesFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
            provide: RidesFacade,
            useValue: {
                getRideGeometries: jest.fn()
            }
        }
      ]
    });
    service = TestBed.inject(RidesFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRideGeometries', () => {
    it('should call getRideGeometries', () => {
      service.getRideGeometries(1);
      expect(service.getRideGeometries).toHaveBeenCalled();
    });
  });
});
