import { TestBed } from '@angular/core/testing';

import { BonsReceptionService } from './bons-reception.service';

describe('BonsReceptionService', () => {
  let service: BonsReceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonsReceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
