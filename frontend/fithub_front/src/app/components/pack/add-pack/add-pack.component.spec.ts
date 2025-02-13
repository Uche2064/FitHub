import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackComponent } from './add-pack.component';

describe('AddPackComponent', () => {
  let component: AddPackComponent;
  let fixture: ComponentFixture<AddPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
