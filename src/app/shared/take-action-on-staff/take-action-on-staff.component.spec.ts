import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeActionOnStaffComponent } from './take-action-on-staff.component';

describe('TakeActionOnStaffComponent', () => {
  let component: TakeActionOnStaffComponent;
  let fixture: ComponentFixture<TakeActionOnStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeActionOnStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeActionOnStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
