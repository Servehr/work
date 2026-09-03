import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ImageComponent } from '../../../../components/controls/image/image.component';
import { bootstrapFacebook } from '@ng-icons/bootstrap-icons';
import { FacebookComponent } from '../../../../util/icons/social/facebook/facebook.component';
import { YoutubeComponent } from '../../../../util/icons/social/youtube/youtube.component';
import { InstagramComponent } from '../../../../util/icons/social/instagram/instagram.component';
import { TiktokComponent } from '../../../../util/icons/social/tiktok/tiktok.component';
import { TwitchComponent } from '../../../../util/icons/social/twitch/twitch.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { Router, RouterOutlet } from '@angular/router';
import { CalendarComponent } from '../../../../util/icons/calendar/calendar.component';
import { LocationComponent } from '../../../../util/icons/location/location.component';
import { TimeComponent } from '../../../../util/icons/time/time.component';
import { TopicComponent } from '../../../../util/icons/topic/topic.component';
import { BasicCardComponent } from '../../../../components/card/basic-card/basic-card.component';
import { TwitterComponent } from '../../../../util/icons/social/twitter/twitter.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
             ImageComponent, RouterOutlet, BotinComponent, BasicCardComponent,
             TopicComponent, LocationComponent, CalendarComponent, TimeComponent,
             YoutubeComponent, InstagramComponent, TiktokComponent, TwitchComponent, TwitterComponent, FacebookComponent
           ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {

   router = inject(Router)
   eventDisplay = signal<string>('../../../../../../e7f650c437fa623f59acbae1e10902f9.jpg')
   width = input(150)
   height = input(50)
   editIcon: any = bootstrapFacebook

   location = signal<string>('Seventh PromoMax')
   time = signal<string>('9:00am')
   date = signal<string>('September 3, 2026')

   alt = signal<string>('')
   // logo = signal<string>('')
   event = input<{logo: string, alt: string, title: string, location: string, date: string, time: string}>({ logo: '', alt: '', title: '', location: '', date: '', time: '' })

   style: any = {
     'background-color' : '#ffff',
     'color': 'black',
     'padding': '20px',
   }

   ngOnInit()
   {
    
   }

   speakers = signal([
       {
          img: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
          alt: 'one',
          name: 'Surprise and shine',
          title: ''
       },
       {
          img: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
          alt: 'one',
          name: 'Surprise and shine',
          title: ''
       },
       {
          img: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
          alt: 'one',
          name: 'Surprise and shine',
          title: ''
       },
       {
          img: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8',
          alt: 'one',
          name: 'Surprise and shine',
          title: ''
       }
    ])

    ChangeOnButtonHoverIn()
    {
       this.style = {
         'background-color' : '#ffff',
         'color': 'black',
         'padding': '20px',
         'border': '2px #a5a327 solid'    
       }
    }

    ChangeOnButtonHoverOut()
    {
       this.style = {
          'background-color' : '#ffff',
          'color': 'black',
          'padding': '20px'   
       } 
    }

    detail = () =>
    {
       
    }


}

