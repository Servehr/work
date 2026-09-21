import { Component, OnInit, signal } from '@angular/core';
import { ImageComponent } from '../../../components/controls/image/image.component';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss'
})
export class PartnerComponent implements OnInit {

  partners =  signal([
    {
      logo: '../../../../../logo/iphone-logo-png_seeklogo-363420.png',
      name: '9:00am',
      alt: ''
    },
    {
      logo: '../../../../../logo/itel-logo-png_seeklogo-432145.png',
      name: '9:00am',
      alt: ''
    },
    {
      logo: '../../../../../logo/mercedes-benz-logo-png_seeklogo-91081.png',
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
    },
    {
      logo: '../../../../../logo/iphone-logo-png_seeklogo-363420.png',
      name: '9:00am',
      alt: ''
    },
    {
      logo: '../../../../../logo/itel-logo-png_seeklogo-432145.png',
      name: '9:00am',
      alt: ''
    },
    {
      logo: '../../../../../logo/mercedes-benz-logo-png_seeklogo-91081.png',
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

  ngOnInit(): void 
  {
     
  }


    

}
