import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RexourceComponent } from './rexource.component';

describe('RexourceComponent', () => {
  let component: RexourceComponent;
  let fixture: ComponentFixture<RexourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RexourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RexourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
