import { Component, Input } from '@angular/core';
import { SwitchComponent } from '../../../../components/switch/switch.component';
import { CheckComponent } from '../../../../components/controls/check/check.component';

@Component({
  selector: 'app-settings-control',
  standalone: true,
  imports: [SwitchComponent, CheckComponent],
  templateUrl: './settings-control.component.html',
  styleUrl: './settings-control.component.scss'
})
export class SettingsControlComponent {

   @Input() selectedRole: string = '-1'
   @Input() resource: { id: string, name: string } = { id: '-1', name: "" }

   @Input() label: string = ''
   @Input() switchStatus:boolean = true
   @Input() switchState: string = 'flex w-20 h-10 rounded-full transition-all duration-500 bg-red-400 cursor-pointer'
   @Input() switchingState: string = 'w-10 h-10 rounded-full transition-all duration-500 ml-0 bg-red-900 border-10'

   changeStatus = (event: any) => 
   {
     this.switchStatus = event.switchStatus
     this.switchState = event.switchState
     this.switchingState = event.switchingState
   }

}