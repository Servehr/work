import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastResponseFormComponent } from './fast-response-form.component';

describe('FastResponseFormComponent', () => {
  let component: FastResponseFormComponent;
  let fixture: ComponentFixture<FastResponseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastResponseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastResponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
