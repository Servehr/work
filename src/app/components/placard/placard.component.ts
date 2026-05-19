import { Component, Input } from '@angular/core';
import { ImageComponent } from '../controls/image/image.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-placard',
  standalone: true,
  imports: [ImageComponent, NgClass],
  templateUrl: './placard.component.html',
  styleUrl: './placard.component.scss'
})
export class PlacardComponent {

  height: number = 100
  width: number = 100
  alt: string = 'image-here'
  src: string = '../../../../../man.jpg'
  imageClass: string = 'rounded-full'

  @Input()
  imageStyle: any = {
       'border-radius' : '20%'
  }
  
  

  fullname: string = 'Grace Favour'
  position: string = 'Manager'

}
