import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectRexourceComponent } from './connect-rexource.component';

describe('ConnectRexourceComponent', () => {
  let component: ConnectRexourceComponent;
  let fixture: ComponentFixture<ConnectRexourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectRexourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectRexourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
