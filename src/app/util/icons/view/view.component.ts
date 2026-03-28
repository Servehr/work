import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapEyeFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  
  viewIcon: any = bootstrapEyeFill
  readonly value = input.required<number>()
  readonly clickEvent = output<number>()
  editColor: string = 'green'
  style: any = {
    'color': 'green'
  }

  onClick(): void {
    this.clickEvent.emit(this.value())
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
     'color': '#ffca0a'   
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
     'color': 'green'  
    } 
  }

}
