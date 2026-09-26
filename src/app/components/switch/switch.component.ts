import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Input, model, OnInit, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [NgClass],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {

  status = model<boolean>(false)
  label = input<string>('')
  action = input<string>('')
  page = input<string>('')
  @Input() isOn = false;
  @Output() isOnChange = new EventEmitter<{ action: string, page: string, status: boolean }>();

  toggle() 
  {
    this.isOn = !this.isOn;
    this.isOnChange.emit({ action: this.action(), page: this.page(), status: this.isOn });
  }
}
