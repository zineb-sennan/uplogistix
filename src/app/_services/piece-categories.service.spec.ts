import { TestBed } from '@angular/core/testing';

import { PieceCategoriesService } from './piece-categories.service';

describe('PieceCategoriesService', () => {
  let service: PieceCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
