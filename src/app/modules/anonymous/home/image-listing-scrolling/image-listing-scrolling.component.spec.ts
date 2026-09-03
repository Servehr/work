import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListingScrollingComponent } from './image-listing-scrolling.component';

describe('ImageListingScrollingComponent', () => {
  let component: ImageListingScrollingComponent;
  let fixture: ComponentFixture<ImageListingScrollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageListingScrollingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageListingScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
