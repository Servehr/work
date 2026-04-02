import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUnlinkComponent } from './link-unlink.component';

describe('LinkUnlinkComponent', () => {
  let component: LinkUnlinkComponent;
  let fixture: ComponentFixture<LinkUnlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkUnlinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkUnlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
