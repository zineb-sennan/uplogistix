import { TestBed } from '@angular/core/testing';

import { BonsReceptionDetailsService } from './bons-reception-details.service';

describe('BonsReceptionDetailsService', () => {
  let service: BonsReceptionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonsReceptionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
