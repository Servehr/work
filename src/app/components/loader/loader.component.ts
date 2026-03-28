import { Component } from '@angular/core';
import { GifComponent } from '../controls/gif/gif.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [GifComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

  height: number = 5
  width: number = 21
  alt: string = 'image-here'
  src: string = '../../../../../loader.gif'
  
}