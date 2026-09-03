import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapFacebook, bootstrapInstagram, bootstrapYoutube } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.scss'
})
export class YoutubeComponent {
  
  youtube: any = bootstrapYoutube
  // readonly clickEvent = output<{ id: string, data: any }>()
  editColor: string = 'blue'
  style: any = {
    'color': 'red'
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
     'color': 'red'  
    } 
  }

}


