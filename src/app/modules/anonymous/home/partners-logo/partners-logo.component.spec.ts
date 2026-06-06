import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersLogoComponent } from './partners-logo.component';

describe('PartnersLogoComponent', () => {
  let component: PartnersLogoComponent;
  let fixture: ComponentFixture<PartnersLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
