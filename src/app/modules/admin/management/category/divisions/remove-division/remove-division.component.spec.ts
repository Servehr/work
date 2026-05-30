import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDivisionComponent } from './remove-division.component';

describe('RemoveDivisionComponent', () => {
  let component: RemoveDivisionComponent;
  let fixture: ComponentFixture<RemoveDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveDivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
