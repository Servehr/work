import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHorizontalScrollComponent } from './item-horizontal-scroll.component';

describe('ItemHorizontalScrollComponent', () => {
  let component: ItemHorizontalScrollComponent;
  let fixture: ComponentFixture<ItemHorizontalScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemHorizontalScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
