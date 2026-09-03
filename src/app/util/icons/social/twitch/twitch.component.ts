import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapFacebook, bootstrapInstagram, bootstrapTwitch } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-twitch',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './twitch.component.html',
  styleUrl: './twitch.component.scss'
})
export class TwitchComponent {
  
  twitch: any = bootstrapTwitch
  // readonly clickEvent = output<{ id: string, data: any }>()
  editColor: string = 'blue'
  style: any = {
    'color': 'gray'
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
     'color': 'gray'  
    } 
  }

}


