import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCategoryComponent } from './write-category.component';

describe('WriteCategoryComponent', () => {
  let component: WriteCategoryComponent;
  let fixture: ComponentFixture<WriteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
