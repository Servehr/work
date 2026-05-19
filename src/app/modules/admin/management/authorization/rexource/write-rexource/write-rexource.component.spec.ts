import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRexourceComponent } from './write-rexource.component';

describe('WriteRexourceComponent', () => {
  let component: WriteRexourceComponent;
  let fixture: ComponentFixture<WriteRexourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteRexourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteRexourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
