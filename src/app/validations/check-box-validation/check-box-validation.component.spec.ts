import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxValidationComponent } from './check-box-validation.component';

describe('CheckBoxValidationComponent', () => {
  let component: CheckBoxValidationComponent;
  let fixture: ComponentFixture<CheckBoxValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckBoxValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBoxValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
