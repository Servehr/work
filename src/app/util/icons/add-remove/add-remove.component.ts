import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-add-remove',
  standalone: true,
  imports: [],
  templateUrl: './add-remove.component.html',
  styleUrl: './add-remove.component.scss'
})
export class AddRemoveComponent {
  
  readonly value = input.required<{ count: number, data: any, roleName: string }>()
  readonly clickEvent = output<{ count: number, data: any, roleName: string }>()
  editColor: string = 'blue'

  style: any = 
  {
    'color': 'blue'
  }

  onClick(): void 
  {
    console.log(this.value())
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
     'color': 'blue'  
    } 
  }

}
