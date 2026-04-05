import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLocalGovernmentComponent } from './state-local-government.component';

describe('StateLocalGovernmentComponent', () => {
  let component: StateLocalGovernmentComponent;
  let fixture: ComponentFixture<StateLocalGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateLocalGovernmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateLocalGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
