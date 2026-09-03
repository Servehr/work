import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { bootstrapFacebook, bootstrapInstagram, bootstrapTwitch, bootstrapTwitterX } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-twitter',
  standalone: true,
  imports: [NgIcon, NgStyle],
  templateUrl: './twitter.component.html',
  styleUrl: './twitter.component.scss'
})
export class TwitterComponent {
  
  twitterX: any = bootstrapTwitterX
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


