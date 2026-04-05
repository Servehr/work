import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { RemoveComponent } from '../../../../../../shared/remove/remove.component';
import { WriteStateComponent } from '../../state/write-state/write-state.component';
import { WriteLocalGovernmentComponent } from '../../lga/write-local-government/write-local-government.component';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';

@Component({
  selector: 'app-state-local-government',
  standalone: true,
  imports: [ModalComponent, RemoveComponent, WriteStateComponent, BotinComponent, WriteLocalGovernmentComponent],
  templateUrl: './state-local-government.component.html',
  styleUrl: './state-local-government.component.scss'
})
export class StateLocalGovernmentComponent {

  title: string = 'States Under Country'
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter()
  
  writeRexource: boolean = false
  addIcon: any = bootstrapPlusCircleFill
  isStateLocalGovernmentUpdate: boolean = false
  isStateLocalGovernmentDelete: boolean = false

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
     { name: 'Lagos' }, 
     { name: 'Kano' },
     { name: 'Abia' },
     { name: 'Ogun' },
     { name: 'Osun' },
     { name: 'Enugu' },
     { name: 'Kogi' },
     { name: 'Bayelsa' }
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


