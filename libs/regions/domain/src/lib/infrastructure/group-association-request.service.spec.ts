import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GroupAssociationRequestService } from './group-association-request.service';

describe('GroupAssociationRequestService', () => {
  let service: GroupAssociationRequestService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
    } as unknown as HttpClient;

    TestBed.configureTestingModule({
      providers: [ { provide: HttpClient, useValue: mockHttpClient } ]
    });
    service = TestBed.inject(GroupAssociationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
