import { NgClass, NgStyle } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { bootstrapArrowLeft, bootstrapArrowRight, bootstrapArrowUp, bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-arrow-right',
  standalone: true,
  imports: [NgStyle, NgClass, NgIcon],
  templateUrl: './arrow-right.component.html',
  styleUrl: './arrow-right.component.scss'
})
export class ArrowRightComponent {
  
  readonly value = input<string>()
  readonly clickEvent = output<string>()
  disconnected: any = bootstrapArrowRight
  // connected: any = bootstrapCheckCircleFill
  connected: any = bootstrapArrowUp

  style: any = {
    'color': 'green'
  }

  constructor()
  {
     console.log(this.value())
  }

  onClick(): void {
    console.log(this.value())
    this.clickEvent.emit(this.value()!)
  }

  ChangeOnButtonHoverIn()
  {
    this.style = {
     'color': '#000000' ,
     'size': '20px'  
    }
  }

  ChangeOnButtonHoverOut()
  {
    this.style = {
     'color': 'green'
    } 
  }

}


