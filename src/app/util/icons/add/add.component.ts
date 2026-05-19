import { Component, EventEmitter, input, Input, OnInit, Output, output, signal } from '@angular/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
  host: {
    '(click)': 'sendData.emit($event)'
  }
})
export class AddComponent {
  
  addIcon: any = bootstrapPlusCircleFill
  readonly value = input.required<number>()
  readonly clickEvent = output<number>()

  onClick(): void {
    this.clickEvent.emit(this.value())
  }


}
