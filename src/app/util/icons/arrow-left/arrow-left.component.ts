import { NgClass, NgStyle } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { bootstrapArrowLeft } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-arrow-left',
  standalone: true,
  imports: [NgStyle, NgClass, NgIcon],
  templateUrl: './arrow-left.component.html',
  styleUrl: './arrow-left.component.scss'
})
export class ArrowLeftComponent {
  
  readonly value = input.required<number>()
  readonly clickEvent = output<number>()
  icon: any = bootstrapArrowLeft

  style: any = {
    'color': 'red'
  }

  onClick(): void {
    this.clickEvent.emit(this.value())
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
     'color': '#000000'   
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
     'color': 'red'  
    } 
  }

}

