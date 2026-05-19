import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { RemoveComponent } from '../../../../../../shared/remove/remove.component';
import { WriteStateComponent } from '../../state/write-state/write-state.component';

@Component({
  selector: 'app-country-state',
  standalone: true,
  imports: [ModalComponent, RemoveComponent, WriteStateComponent],
  templateUrl: './country-state.component.html',
  styleUrl: './country-state.component.scss'
})
export class CountryStateComponent {

  title: string = 'States under country'

  @Input() buttonName: string = ''
  
  writeRexource: boolean = false
  addIcon: any = bootstrapPlusCircleFill
  isCountryStateUpdate: boolean = false
  isCountryStateDelete: boolean = false

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

