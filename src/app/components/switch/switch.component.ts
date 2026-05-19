import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [NgClass],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {

   @Input() label: string = ''
   @Input() switchStatus: boolean = false
   @Input() switchState: string = 'flex w-20 h-10 rounded-full transition-all duration-500 bg-red-400 cursor-pointer'
   @Input() switchingState: string = 'h-10 w-10 rounded-full transition-all duration-500 ml-0 bg-red-900 border-10'
   @Output() changeState: EventEmitter<boolean> = new EventEmitter<boolean>()


   @Input() CheckLabelText!: string
   @Input() UnCheckLabelText!: string

   isChecked: boolean = true
   isDisabled: boolean = false

   toggle()
   {
      if(!this.isDisabled)
      {
         this.isChecked = !this.isChecked
      }
   }

   constructor(){
      this.onSwitchChanged()
   }

   onSwitchChanged()
   {
      this.changeStatus()
      const data:any = {   
            "switchStatus": this.switchStatus,
            "switchState": this.switchState,
            "switchingState": this.switchingState,
      }
      this.changeState.emit(data)
   }

   changeStatus = () => 
   {console.log((this.switchStatus))
      if(this.switchStatus)
      {
         this.switchStatus = !this.switchStatus
         this.switchState = 'flex w-20 h-10 rounded-full transition-all duration-500 bg-green-400 cursor-pointer'
         this.switchingState = 'h-10 w-10 bg-gray-200 rounded-full transition-all duration-500 ml-10 bg-green-900' 
      } else {
         this.switchStatus = !this.switchStatus
         this.switchState = 'flex w-20 h-10 rounded-full transition-all duration-500 bg-red-400 cursor-pointer' 
         this.switchingState = 'h-10 w-10 bg-gray-200 rounded-full transition-all duration-500 ml-0 bg-red-900 border-10'
      }
   }

}
