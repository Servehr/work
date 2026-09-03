import { Component, EventEmitter, input, Input, OnInit, Output, output, signal } from '@angular/core';
import { bootstrapClock, bootstrapClockFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  
  time: any = bootstrapClock  
  color = input<string>('black')

  onClick(): void {
    
  }


}


