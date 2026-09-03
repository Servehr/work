import { Component, EventEmitter, input, Input, OnInit, Output, output, signal } from '@angular/core';
import { bootstrapCalendarCheck, bootstrapCalendarCheckFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
  // host: {
  //   '(click)': 'sendData.emit($event)'
  // }
})
export class CalendarComponent {
  
  calendar: any = bootstrapCalendarCheck
  color = input<string>('black')

  onClick(): void {
    
  }


}

