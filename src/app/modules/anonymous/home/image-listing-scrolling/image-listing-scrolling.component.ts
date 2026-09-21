import { Component, Input, signal } from '@angular/core';
import { ImageComponent } from '../../../../components/controls/image/image.component';

@Component({
  selector: 'app-image-listing-scrolling',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './image-listing-scrolling.component.html',
  styleUrl: './image-listing-scrolling.component.scss',
})
export class ImageListingScrollingComponent {

    height = signal<any>(40)
    width = signal<any>(40)
    customClass = signal<string>('w-[80px] h-[80px]')

    partners =  signal([
        {
          logo: '../../../../../logo/iphone-logo-png_seeklogo-363420.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/gig-logistics.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/gotv-logo-png_seeklogo-496045.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/milo-logo-png_seeklogo-326243.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/samsung-logo-png_seeklogo-122017.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/images.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/mobil.jpg ',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/nigerian-national-petroleum-company-logo-png_seeklogo-455636.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/total-energy.jpg',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/milo-logo-png_seeklogo-326243.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/samsung-logo-png_seeklogo-122017.png',
          name: '9:00am',
          alt: ''
        },
        {
          logo: '../../../../../logo/university-of-lagos-logo-png_seeklogo-188368.png',
          name: '9:00am',
          alt: ''
        }
      ])



}