import { Component, EventEmitter, input, Input, OnInit, Output, output, signal } from '@angular/core';
import { bootstrapBorderStyle } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent {
  
  topic: any = bootstrapBorderStyle
  color = input<string>('black')

  onClick(): void {
    
  }


}



