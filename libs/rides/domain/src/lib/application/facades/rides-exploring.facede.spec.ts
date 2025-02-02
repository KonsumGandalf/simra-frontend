import { TestBed } from '@angular/core/testing';

import { RidesExploringFacade } from './rides-exploring.facade';

describe('RidesExploringFaceService', () => {
  let service: RidesExploringFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesExploringFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
