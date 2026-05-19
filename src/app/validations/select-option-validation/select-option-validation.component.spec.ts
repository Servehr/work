import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionValidationComponent } from './select-option-validation.component';

describe('SelectOptionValidationComponent', () => {
  let component: SelectOptionValidationComponent;
  let fixture: ComponentFixture<SelectOptionValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOptionValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOptionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
