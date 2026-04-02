import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteActionComponent } from './write-action.component';

describe('WriteActionComponent', () => {
  let component: WriteActionComponent;
  let fixture: ComponentFixture<WriteActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
