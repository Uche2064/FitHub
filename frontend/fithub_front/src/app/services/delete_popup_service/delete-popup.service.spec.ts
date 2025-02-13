import { TestBed } from '@angular/core/testing';
import { DeletePopupService } from './delete-popup.service';


describe('DeletePopupService', () => {
  let service: DeletePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
