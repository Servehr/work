import { NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal, SimpleChanges } from '@angular/core';
import { bootstrapStarFill, bootstrapThreeDotsVertical } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';
import { ImageComponent } from '../../../../components/controls/image/image.component';

@Component({
  selector: 'app-top-engagers',
  standalone: true,
  imports: [NgClass, NgIcon, ImageComponent],
  templateUrl: './top-engagers.component.html',
  styleUrl: './top-engagers.component.scss'
})
export class TopEngagersComponent {

  threeDot: any = bootstrapThreeDotsVertical  
  rating: any = bootstrapStarFill      
  width = signal<number>(300)
  height = signal<number>(300)
  
  isHamburgOver: boolean = false

  users = input<any>([])

  overBurger()
  {
    this.isHamburgOver = !this.isHamburgOver
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
     console.log(changes)   
  }


}
