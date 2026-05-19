import { NgClass, NgStyle } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { bootstrapArrowRight } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-arrow-right',
  standalone: true,
  imports: [NgStyle, NgClass, NgIcon],
  templateUrl: './arrow-right.component.html',
  styleUrl: './arrow-right.component.scss'
})
export class ArrowRightComponent {
  
  readonly value = input.required<number>()
  readonly clickEvent = output<number>()
  icon: any = bootstrapArrowRight

  style: any = {
    'color': 'green'
  }

  onClick(): void {
    this.clickEvent.emit(this.value())
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
     'color': '#000000' ,
     'size': '20px'  
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
     'color': 'green'
    } 
  }

}


