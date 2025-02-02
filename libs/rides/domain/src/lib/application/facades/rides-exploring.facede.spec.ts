import { TestBed } from '@angular/core/testing';

import { RidesExploringFacade } from './rides-exploring.facade';

describe('RidesExploringFaceService', () => {
  let service: RidesExploringFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
            provide: RidesExploringFacade,
            useValue: {
                getRideGeometries: jest.fn()
            }
        }
      ]
    });
    service = TestBed.inject(RidesExploringFacade);
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
