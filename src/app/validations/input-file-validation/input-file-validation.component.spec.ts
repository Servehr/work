import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileValidationComponent } from './input-file-validation.component';

describe('InputFileValidationComponent', () => {
  let component: InputFileValidationComponent;
  let fixture: ComponentFixture<InputFileValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFileValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
