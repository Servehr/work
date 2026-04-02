import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { WriteActionComponent } from '../write-action/write-action.component';
import { RemoveComponent } from '../../../../../../shared/remove/remove.component';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [ModalComponent, WriteActionComponent, RemoveComponent],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {

  title: string = 'Page Actions'
  @Input() buttonName: string = ''
  writeRexource: boolean = false
  addIcon: any = bootstrapPlusCircleFill

  ////////////   
  PageTitle: string = 'Pages'
  pageAction: boolean = false
  pageActionDelete: boolean = false
  isModalOpen: boolean = false
  modalWidth: string = 'w-[750px]'
  //////////////////////

   value: string = ''
   rows: number = 3
   

   actions: any[] = [
     { actionName: 'Create Role', description: 'Create role Description' }, 
     { actionName: 'Update Role', description: 'Update role description' },
     { actionName: 'Update Role', description: 'Update role description' },
     { actionName: 'Update Role', description: 'Update role description' },
     { actionName: 'Update Role', description: 'Update role description' },
     { actionName: 'Update Role', description: 'Update role description' },
     { actionName: 'Update Role', description: 'Update role description' },
     { actionName: 'Update Role', description: 'Update role description' }
   ]
  
   errorMessages = 
   { 
     roleName: 'Enter name for action', 
     note: 'Enter description for action'
   }

   @Input() ModalState: string = ''
   @Input() UpperModalState: string = ''
   @Output() FromPackage: EventEmitter<string> = new EventEmitter()

   newAction: FormGroup;
      
   constructor(private store: Store<AppState>)
   { 
     this.newAction = new FormGroup(
        {
          actionName: new FormControl('', [Validators.required]),
          note: new FormControl('', [Validators.required])
        }
     )    
   }

   CloseModal()
   {
     this.ModalState = ''
     this.FromPackage.emit('')     
   }

   CloseCurrentModal()
   {
     this.UpperModalState = ''
    //  this.FromPackage.emit('')
   }

   a()
   {

   }

   onConfirm()
   {
     
   }

   Close()
   {
     this.UpperModalState = ''
    //  this.FromPackage.emit('')
   }

}
