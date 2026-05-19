import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaValidationComponent } from './text-area-validation.component';

describe('TextAreaValidationComponent', () => {
  let component: TextAreaValidationComponent;
  let fixture: ComponentFixture<TextAreaValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
