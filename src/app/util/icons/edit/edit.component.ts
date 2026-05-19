import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapCrosshair2 } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  
  editIcon: any = bootstrapCrosshair2
  readonly value = input.required<string>()
  readonly data = input.required<any>()
  readonly clickEvent = output<{ id: string, data: any }>()
  editColor: string = 'blue'
  style: any = {
    'color': 'blue'
  }

  onClick(): void 
  {
    this.clickEvent.emit({ id: this.value(), data: this.data()})
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
     'color': 'blue'  
    } 
  }

}
