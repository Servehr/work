import { Component, inject, input, Input, model, OnDestroy, OnInit, output, signal } from '@angular/core';
import { SwitchComponent } from '../../../../components/switch/switch.component';
import { CheckComponent } from '../../../../components/controls/check/check.component';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../../../../notifications/administration';
import { Store } from '@ngrx/store';
import AppState from '../../../../state/app.state';
import { PERMISSION } from '../../../../state/actions/management/aktion.actions';

@Component({
  selector: 'app-settings-control',
  standalone: true,
  imports: [SwitchComponent, CheckComponent],
  templateUrl: './settings-control.component.html',
  styleUrl: './settings-control.component.scss'
})
export class SettingsControlComponent implements OnInit, OnDestroy {

   selectedRole = input<string>('')
   selectedResource = input<string>('')
   selectedResourceName = model<string>('')
   resources = input<any>([])
   sub!: Subscription;
   private administration = inject(AdministrationService)

   @Input() label: string = ''
   thePage = signal<string>('')
   all = signal<boolean>(false)
   actionIds = signal<any>([])
   @Input() switchStatus:boolean = true
   @Input() switchState: string = 'flex w-20 h-10 rounded-full transition-all duration-500 bg-red-400 cursor-pointer'
   @Input() switchingState: string = 'w-10 h-10 rounded-full transition-all duration-500 ml-0 bg-red-900 border-10'

   resourcePagesActions = signal<any>([])

   changeStatus = (event: any) => 
   {
     this.switchStatus = event.switchStatus
     this.switchState = event.switchState
     this.switchingState = event.switchingState
   }

   constructor(private store: Store<AppState>){}

   ngOnInit()
   {
      this.sub = this.administration.data$.subscribe((data: any) => 
      {
        if(data?.condition === 'pages-actions')
        {

          this.selectedResourceName.set(data?.data[0]?.name)
          this.resourcePagesActions.set(data?.data[0]?.pages)
        }         
      })
   }

   pointTo(data: { action: any, page: string, status: boolean })
   {
      if(Array.isArray(data?.action))
      {
         const Ids = data?.action?.map((onlyId: { _id: string, name: string }) => {
            return onlyId?._id
         })        
         console.log("An Array")
         this.store.dispatch(PERMISSION({ role: this.selectedRole(), rexource: this.selectedResource(), page: data?.page, action: Ids, status: data?.status }))
      } else {
         console.log("Single")
         this.store.dispatch(PERMISSION({ role: this.selectedRole(), rexource: this.selectedResource(), page: data?.page, action: data?.action, status: data?.status }))
      }
   }



   toCheck(data: any)
   {
      this.all.set(data)
   }

   ngOnDestroy()
   {
     this.sub.unsubscribe()
   }

}