import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalLocationComponent } from './professional-location.component';

describe('ProfessionalLocationComponent', () => {
  let component: ProfessionalLocationComponent;
  let fixture: ComponentFixture<ProfessionalLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
