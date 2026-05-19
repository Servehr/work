import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteStaffComponent } from './write-staff.component';

describe('WriteStaffComponent', () => {
  let component: WriteStaffComponent;
  let fixture: ComponentFixture<WriteStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
