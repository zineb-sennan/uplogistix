import { TestBed } from '@angular/core/testing';

import { PiecesRechangeService } from './pieces-rechange.service';

describe('PiecesRechangeService', () => {
  let service: PiecesRechangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiecesRechangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
