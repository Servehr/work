import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ImageComponent } from '../../../../components/controls/image/image.component';
import { bootstrapFacebook, bootstrapGeoAlt } from '@ng-icons/bootstrap-icons';
import { FacebookComponent } from '../../../../util/icons/social/facebook/facebook.component';
import { YoutubeComponent } from '../../../../util/icons/social/youtube/youtube.component';
import { InstagramComponent } from '../../../../util/icons/social/instagram/instagram.component';
import { TiktokComponent } from '../../../../util/icons/social/tiktok/tiktok.component';
import { TwitchComponent } from '../../../../util/icons/social/twitch/twitch.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { Router, RouterOutlet } from '@angular/router';
import { TopicComponent } from '../../../../util/icons/topic/topic.component';
import { LocationComponent } from '../../../../util/icons/location/location.component';
import { CalendarComponent } from '../../../../util/icons/calendar/calendar.component';
import { TimeComponent } from '../../../../util/icons/time/time.component';
import { TwitterComponent } from '../../../../util/icons/social/twitter/twitter.component';

@Component({
  selector: 'app-event-listing',
  standalone: true,
  imports: [
              ImageComponent, RouterOutlet, BotinComponent, 
              YoutubeComponent, TwitterComponent, InstagramComponent, TiktokComponent, TwitchComponent, FacebookComponent, TopicComponent, LocationComponent, CalendarComponent, TimeComponent
           ],
  templateUrl: './event-listing.component.html',
  styleUrl: './event-listing.component.scss'
})
export class EventListingComponent implements OnInit {

   router = inject(Router)

   geoAlt = bootstrapGeoAlt

   width = input(150)
   height = input(50)
   editIcon: any = bootstrapFacebook
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
     console.log(this.event())
   }

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
      this.router.navigate(['events-details'])
    }


}
