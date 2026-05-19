import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxCheckComponent } from './box-check.component';

describe('BoxCheckComponent', () => {
  let component: BoxCheckComponent;
  let fixture: ComponentFixture<BoxCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
