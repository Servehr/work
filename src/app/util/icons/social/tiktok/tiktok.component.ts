import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapFacebook, bootstrapInstagram, bootstrapTiktok } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-tiktok',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './tiktok.component.html',
  styleUrl: './tiktok.component.scss'
})
export class TiktokComponent {
  
  tiktok: any = bootstrapTiktok
  // readonly clickEvent = output<{ id: string, data: any }>()
  editColor: string = 'blue'
  style: any = {
    'color': 'black'
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
     'color': 'black'  
    } 
  }

}

