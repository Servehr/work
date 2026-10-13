import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualSlidesComponent } from './virtual-slides.component';

describe('VirtualSlidesComponent', () => {
  let component: VirtualSlidesComponent;
  let fixture: ComponentFixture<VirtualSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualSlidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
