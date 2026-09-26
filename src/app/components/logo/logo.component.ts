import { Component, signal } from '@angular/core';
import { ImageComponent } from '../controls/image/image.component';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {

  height: number = 10
  width: number = 180
  alt: string = 'image-here'
  src: string = '../../../../../technicianswoork.jpeg'
  customClass = signal<string>('w-[160px]')
  
}

