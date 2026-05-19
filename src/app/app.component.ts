import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import AppState from './state/app.state';
import { PASS_THE_TOKEN } from './state/actions/auth.actions';
import { Observable, switchMap } from 'rxjs';
import { GeolocationService } from './util/location/geolocation.service';
import { DatabaseService } from './service/db/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

   title = 'Technicians Work';

   lat: number | undefined;
   lng: number | undefined;

   store = inject(Store<AppState>)
   geolocationService = inject(GeolocationService)
   dbService = inject(DatabaseService)

   ngOnInit(): void 
   {
      // this.getGeoLocation()
      this.store.dispatch(PASS_THE_TOKEN())
      const locale = navigator.language
      // alert(locale)
   }

   getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.saveUserLocation(position.coords.latitude, position.coords.longitude)
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }

  saveUserLocation = async (longitude: any, latitude: any) => 
  {
     const currentLocation = { longitude, latitude }
     await this.dbService.clearUserCurrentPosition()
     await this.dbService.userLocation(currentLocation)
     await this.dbService.getUserLocation()
  }




  
}
