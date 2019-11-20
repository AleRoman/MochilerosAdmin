import { TestBed } from '@angular/core/testing';

import { HotelesService } from './hoteles.service';

describe('HotelesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelesService = TestBed.get(HotelesService);
    expect(service).toBeTruthy();
  });
});
