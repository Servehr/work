import { Component, EventEmitter, Output } from '@angular/core';
import { BotinComponent } from '../../components/controls/botin/botin.component';

@Component({
  selector: 'app-remove',
  standalone: true,
  imports: [BotinComponent],
  templateUrl: './remove.component.html',
  styleUrl: './remove.component.scss'
})
export class RemoveComponent {

  @Output() close: EventEmitter<void> = new EventEmitter()
  
  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '10px 20px 10px 20px' 
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
      'background-color' : '#776005',
      'color': 'white',
      'padding': '10px 20px 10px 20px'         
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '10px 20px 10px 20px'        
    } 
  }

  closeModal()
  {
     this.close.emit()     
  }

  remove()
  {

  }

}
