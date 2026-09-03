import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapFacebook, bootstrapInstagram } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-instagram',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './instagram.component.html',
  styleUrl: './instagram.component.scss'
})
export class InstagramComponent {
  
  instagram: any = bootstrapInstagram
  // readonly clickEvent = output<{ id: string, data: any }>()
  editColor: string = 'blue'
  style: any = {
    'color': 'pink'
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
     'color': 'pink'  
    } 
  }

}
