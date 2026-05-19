import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCheckValidationComponent } from './radio-check-validation.component';

describe('RadioCheckValidationComponent', () => {
  let component: RadioCheckValidationComponent;
  let fixture: ComponentFixture<RadioCheckValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioCheckValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioCheckValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
