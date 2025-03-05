import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_CONFIG } from '@simra/common-models';

import { mapillaryInterceptor } from './mapillary.interceptor';

describe('mapillaryInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_CONFIG,
          useValue: {
            apiUrl: 'http://localhost:8080',
          },
        },
        provideHttpClient(withInterceptors([mapillaryInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should return the original request if the request URL does not start with the Mapillary API base segment', () => {
    const url = '/non-mapillary/resource';

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.url).toEqual(url);
  });
});
