import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePlanComponent } from './write-plan.component';

describe('WritePlanComponent', () => {
  let component: WritePlanComponent;
  let fixture: ComponentFixture<WritePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
