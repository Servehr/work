import { NgIf, NgFor, AsyncPipe, KeyValuePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';

@Component({
  selector: 'app-carousel-swiper',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, KeyValuePipe, NgFor,],
  templateUrl: './carousel-swiper.component.html',
  styleUrl: './carousel-swiper.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselSwiperComponent {

  sliders = input<string[]>([])

  // sliders = signal([
  //   "https://ps.w.org/ml-slider/assets/banner-1544x500.png?rev=2907610",
  //   "https://cdn2.mageplaza.com/media/general2/H4BvhSS.jpg"
  // ])  

}
