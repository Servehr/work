import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRexourceComponent } from './remove-rexource.component';

describe('RemoveRexourceComponent', () => {
  let component: RemoveRexourceComponent;
  let fixture: ComponentFixture<RemoveRexourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveRexourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveRexourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
