import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type BotinStyle = {
   [key: string] : string
}

@Component({
  selector: 'app-botin',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './botin.component.html',
  styleUrl: './botin.component.scss'
})
export class BotinComponent {
  
    @Input() label: string = ''
    @Input() disabled: boolean = false
    @Input() style: BotinStyle = {  }
    @Output() ChangeOnButtonHoverIn: EventEmitter<void> = new EventEmitter()
    @Output() ChangeOnButtonHoverOut: EventEmitter<void> = new EventEmitter()
    @Output() sendData: EventEmitter<void> = new EventEmitter()

    ChangeOnHoverIn()
    {
       this.ChangeOnButtonHoverIn.emit()
    }

    ChangeOnHoverOut()
    {
       this.ChangeOnButtonHoverOut.emit()
    }

    submit = () =>
    {
        this.sendData.emit()
    }

}
