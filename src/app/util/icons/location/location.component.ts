import { Component, EventEmitter, input, Input, OnInit, Output, output, signal } from '@angular/core';
import { bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  
  geoAlt: any = bootstrapGeoAltFill
  color = input<string>('black')
  

  onClick(): void {
    
  }


}


