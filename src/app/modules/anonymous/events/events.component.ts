import { Component, signal } from '@angular/core';
import { ImageComponent } from '../../../components/controls/image/image.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { JsonPipe, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, ImageComponent, EventListingComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

    height = signal<any>(100)
    width = signal<any>(1351)
    alt: string = 'image-here'
    // eventBanner = signal<string>('../../../../../Technicians Logo.png')
    eventBanner = signal<string>('../../../../../upcomingevent.png')


    nos = signal<number>(8)
    lambobi = Array.from({ length: 10 }, (_, i) => i);
    
    events = signal([
       {
          logo: '../../../../../logo/iphone-logo-png_seeklogo-363420.png',
          alt: 'one',
          title: 'Surprise and shine',
          location: 'Seventh PromoMax',
          date: 'Seventh PromoMax',
          time: '9:00am'
       },
       {
          logo: '../../../../../logo/itel-logo-png_seeklogo-432145.png',
          alt: 'two',
          title: 'Built for the Hustle',
          location: 'Seventh PromoMax',
          date: 'Seventh PromoMax',
          time: '9:00am'
       },
       {
          logo: '../../../../../logo/mercedes-benz-logo-png_seeklogo-91081.png',
          alt: 'two',
          title: 'Aflac Kickoff - Auburn vs. Baylor',
          location: 'September 6, 2026',
          date: 'Stuttgart',
          time: '9:00am'
       },
       {
          logo: '../../../../../logo/milo-logo-png_seeklogo-326243.png',
          alt: 'two',
          title: 'Milo x Ahmed Musa Sports Clinics (Nigeria)',
          location: 'Seventh PromoMax',
          date: 'September 3, 2026',
          time: '9:00am'
       },
       //  {
       //     logo: '../../../../../logo/nigerian-national-petroleum-company-logo-png_seeklogo-455636.png',
       //     alt: 'two',
       //     title: 'Seventh PromoMax',
       //     location: 'Seventh PromoMax',
       //     date: 'Seventh PromoMax',
       //     time: '9:00am'
       //  },
       {
          logo: '../../../../../logo/samsung-logo-png_seeklogo-122017.png',
          alt: 'two',
          title: 'Galaxy Unpacked',
          location: 'San Francisco',
          date: 'February 25, 2026',
          time: '9:00am'
       },
       {
          logo: '../../../../../logo/university-of-lagos-logo-png_seeklogo-188368.png',
          alt: 'two',
          title: 'AI Career Summit',
          location: 'Afe Babalola Auditorium, University of Lagos, Lagos',
          date: 'Friday, September 4, 2026 at 09:00 AM',
          time: '9:00am'
       }
    ])

}
