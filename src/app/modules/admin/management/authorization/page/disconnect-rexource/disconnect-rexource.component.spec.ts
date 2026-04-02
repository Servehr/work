import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectRexourceComponent } from './disconnect-rexource.component';

describe('DisconnectRexourceComponent', () => {
  let component: DisconnectRexourceComponent;
  let fixture: ComponentFixture<DisconnectRexourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisconnectRexourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnectRexourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
