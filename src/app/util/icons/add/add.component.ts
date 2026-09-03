import { Component, EventEmitter, input, Input, OnInit, Output, output, signal } from '@angular/core';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  
  addIcon: any = bootstrapPlusCircleFill
  size = input<string>('16')
  readonly value = input<number>()
  readonly clickEvent = output<number>()

  onClick(): void 
  {
    this.clickEvent.emit(this.value()!)
  }


}
