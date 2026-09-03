import { Component, input, signal } from '@angular/core';
import { ImageComponent } from '../../controls/image/image.component';

@Component({
  selector: 'app-basic-card',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './basic-card.component.html',
  styleUrl: './basic-card.component.scss'
})
export class BasicCardComponent {

    height = signal<number>(0)
    width = signal<number>(0)

    speaker = input<{img: string, alt: string, name: string, title: string}>({ img: '', alt: '', name: '', title: '' })   

}
