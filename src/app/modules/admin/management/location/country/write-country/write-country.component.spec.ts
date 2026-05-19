import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCountryComponent } from './write-country.component';

describe('WriteCountryComponent', () => {
  let component: WriteCountryComponent;
  let fixture: ComponentFixture<WriteCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
