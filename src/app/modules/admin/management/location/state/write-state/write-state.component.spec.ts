import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteStateComponent } from './write-state.component';

describe('WriteStateComponent', () => {
  let component: WriteStateComponent;
  let fixture: ComponentFixture<WriteStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
