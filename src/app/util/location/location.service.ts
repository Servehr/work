import { inject, Injectable } from '@angular/core';
import { DatabaseService } from '../../service/db/database.service';

@Injectable({ providedIn: 'root' })
export class LocationService {

  private coords: GeolocationCoordinates | null = null;
 dbService = inject(DatabaseService)

  loadLocation(): Promise<void> {
    return new Promise((resolve, reject) => 
    {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser.');
        resolve();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.coords = position.coords;
          this.saveUserLocation(position.coords.latitude, position.coords.longitude)
          resolve();
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert("Possible internet connection failure")
          reject(); // Resolve anyway so the app still starts
        },
        { timeout: 10000 } // Set a reasonable timeout
      );
    });
  }

  getCoordinates() {
    return this.coords;
  }

  saveUserLocation = async (longitude: any, latitude: any) => 
  {
     const currentLocation = { longitude, latitude }
     await this.dbService.clearUserCurrentPosition()
     await this.dbService.userLocation(currentLocation)
     const UserLocation = await this.dbService.getUserLocation()
     console.log("+++++++++++++++++++++++++++++++++++++++")
     console.log(UserLocation)
     console.log("+++++++++++++++++++++++++++++++++++++++")
  }

  
}
