import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteDepartmentComponent } from './write-department.component';

describe('WriteDepartmentComponent', () => {
  let component: WriteDepartmentComponent;
  let fixture: ComponentFixture<WriteDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
