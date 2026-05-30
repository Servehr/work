import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RexourcePagesComponent } from './rexource-pages.component';

describe('RexourcePagesComponent', () => {
  let component: RexourcePagesComponent;
  let fixture: ComponentFixture<RexourcePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RexourcePagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RexourcePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
