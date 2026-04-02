import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLocationComponent } from './write-location.component';

describe('WriteLocationComponent', () => {
  let component: WriteLocationComponent;
  let fixture: ComponentFixture<WriteLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
