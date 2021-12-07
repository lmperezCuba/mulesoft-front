import { TestBed } from '@angular/core/testing';

import { FakeApiServerInterceptor } from './fake-api-server.interceptor';

describe('FakeApiServerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FakeApiServerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FakeApiServerInterceptor = TestBed.inject(FakeApiServerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
