import { Component, signal } from '@angular/core';
import { VirtualSlidesComponent } from '../home/virtual-slides/virtual-slides.component';
import { ImageComponent } from '../../../components/controls/image/image.component';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [VirtualSlidesComponent, ImageComponent],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent {

  bckImg: string = '../../../../../training/menwork.png'

  customClass = signal<string>('w-[80px]')

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
    }
  ])
  
  
  Courses = signal([
    {
      logo: '../../../../../training/welding.jpg',
      heading: 'Welding',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, tempore sapiente eveniet quibusdam ab ea, quaerat placeat numquam aspernatur, accusamus magnam neque.'
    },
    {
      logo: '../../../../../training/electricians.jpg',
      heading: 'Electrification',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, tempore sapiente eveniet quibusdam ab ea, quaerat placeat numquam aspernatur, accusamus magnam neque.'
    },
    {
      logo: '../../../../../training/tile-installer.jpg',
      heading: 'Tiling',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, tempore sapiente eveniet quibusdam ab ea, quaerat placeat numquam aspernatur, accusamus magnam neque.'
    },
    {
      logo: '../../../../../training/brickLayer.jpg',
      heading: 'Brick Laying',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, tempore sapiente eveniet quibusdam ab ea, quaerat placeat numquam aspernatur, accusamus magnam neque.'
    }
  ])

}
