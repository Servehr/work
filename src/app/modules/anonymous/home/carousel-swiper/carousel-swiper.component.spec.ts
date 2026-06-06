import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSwiperComponent } from './carousel-swiper.component';

describe('CarouselSwiperComponent', () => {
  let component: CarouselSwiperComponent;
  let fixture: ComponentFixture<CarouselSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselSwiperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
