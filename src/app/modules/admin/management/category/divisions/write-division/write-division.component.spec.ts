import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteDivisionComponent } from './write-division.component';

describe('WriteDivisionComponent', () => {
  let component: WriteDivisionComponent;
  let fixture: ComponentFixture<WriteDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
