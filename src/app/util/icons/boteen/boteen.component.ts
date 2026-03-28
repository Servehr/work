import { NgClass, NgStyle } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-boteen',
  standalone: true,
  imports: [NgStyle, NgClass, NgIcon],
  templateUrl: './boteen.component.html',
  styleUrl: './boteen.component.scss'
})
export class BoteenComponent {
  
  readonly value = input.required<number>()
  readonly clickEvent = output<number>()
  boteenStyle = input.required<any>()
  readonly boteeName = input.required()
  boteenCssClass = input.required<any>()
  icon: any

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
