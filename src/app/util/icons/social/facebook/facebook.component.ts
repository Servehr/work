import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapFacebook } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-facebook',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './facebook.component.html',
  styleUrl: './facebook.component.scss'
})
export class FacebookComponent {
  
  facebook: any = bootstrapFacebook
  // readonly clickEvent = output<{ id: string, data: any }>()
  editColor: string = 'blue'
  style: any = {
    'color': 'blue'
  }

  onClick(): void 
  {
    // this.clickEvent.emit({ })
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
