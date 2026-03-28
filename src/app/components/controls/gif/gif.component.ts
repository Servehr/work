import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gif',
  standalone: true,
  imports: [],
  templateUrl: './gif.component.html',
  styleUrl: './gif.component.scss'
})
export class GifComponent {
  
    @Input()
    height: number = 150
  
    @Input()
    width: number = 150
    
    @Input()
    alt: string = 'company-logo'
    
    @Input()
    src: string = '../../../../../roller.gif'

}
