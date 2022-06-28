import { TestBed } from '@angular/core/testing';

import { EntrepotsService } from './entrepots.service';

describe('EntrepotsService', () => {
  let service: EntrepotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
