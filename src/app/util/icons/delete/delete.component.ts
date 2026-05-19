import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  
  deleteIcon: any = bootstrapTrash
  readonly value = input.required<string>()
  readonly clickEvent = output<string>()
  editColor: string = 'red'
  style: any = {
    'color': 'red'
  }

  onClick(): void 
  {
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


