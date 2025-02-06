import { TestBed } from '@angular/core/testing';

import { SharedViewService } from './shared-view.service';

describe('SharedViewService', () => {
  let service: SharedViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
