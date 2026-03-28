import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulsateComponent } from './pulsate.component';

describe('PulsateComponent', () => {
  let component: PulsateComponent;
  let fixture: ComponentFixture<PulsateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PulsateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulsateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
