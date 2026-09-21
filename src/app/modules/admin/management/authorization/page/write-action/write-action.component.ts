import { Component, effect, EventEmitter, inject, input, Input, model, OnInit, Output, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../../../../components/controls/input-field/input-field.component';
import { ModalComponent } from '../../../../../../components/modal/modal.component';
import { SetErrorMessage, SetLoadingStatus } from '../../../../../../state/actions/spinner.action';
import { delay, of } from 'rxjs';
import { TextAreaComponent } from '../../../../../../components/controls/text-area/text-area.component';
import { CREATE_AKTION, UPDATE_AKTION } from '../../../../../../state/actions/management/aktion.actions';
import { sleepWait } from '../../../../../../util/sleep';

export const actionNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { actionNameRequired : 'actionNameRequired' } :  null
}

export const actionDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { actionDescriptionRequired : 'actionDescriptionRequired' } :  null
}

@Component({
  selector: 'app-write-action',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, TextAreaComponent, InputFieldComponent, ModalComponent],
  templateUrl: './write-action.component.html',
  styleUrl: './write-action.component.scss'
})
export class WriteActionComponent implements OnInit {

   private store = inject(Store<AppState>)

   @Input() title: string = ''
   buttonName = model<string>('Save')
   currentPage = input<number>()
   perPage = input<number>(1)
   limit = input<number>(1)
   theCurrentPage = input<string>('')
   dataToUpdate = input<any>(null)
   progress = signal<string>('')
   @Output() close: EventEmitter<void> = new EventEmitter()

   rows: number = 7
   cols: number = 20

   id = signal<string>('')
   name = signal<string>('')
   description = signal<string>('')  

    
   pageTitle: string = ''
   isLoading = signal<boolean>(false)
   message: string = ''
   statusCode!: number
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }
  
   errorMessages = 
   { 
      actionNameRequired: 'Enter action name', 
      actionDescriptionRequired: 'Write a note about action to be created'
   } 

   actionForm: FormGroup

   constructor()
   {
      this.actionForm = new FormGroup(
        {
          actionName: new FormControl('', [actionNameRequired]),
          actionDescription: new FormControl('', [actionDescriptionRequired])
        }
      ) 
      this.store.select(getResponseMessage).subscribe((data) => 
      {
        const { statusCode, msg } = data.response
         this.message = msg
         this.statusCode = statusCode
      })

      effect(() => 
      {
        if(this.dataToUpdate())
        {
           this.buttonName.set('Update')
           this.actionForm.get('actionName')?.setValue(this.dataToUpdate()?.name)
           this.actionForm.get('actionDescription')?.setValue(this.dataToUpdate()?.description)
        } else {
           this.actionForm.get('actionName')?.setValue("")
           this.actionForm.get('actionDescription')?.setValue("")
        }
      }, { allowSignalWrites: true })       

   }

   ngOnInit(): void 
   {
     this.store.select(getSpinnerStatus).subscribe((data: any) => 
     {
        if(data?.loader?.page === 'new-action' || data?.loader?.page === 'updated-action')
        {
          this.isLoading.set(false)
          this.closeModal()
        }
     })
   }

   ChangeOnButtonHoverIn()
   {
      this.style = {
        'background-color' : '#776005',
        'color': 'white',
        'padding': '20px'         
      }
    }

    ChangeOnButtonHoverOut()
    {
       this.style = {
          'background-color' : '#be9d18',
          'color': 'black',
          'padding': '20px'        
       } 
    }

    closeModal()
    {
       this.close.emit()
    }
    
    write = async () => 
    {
      if(this.actionForm.valid)
      {
        this.isLoading.set(true)
        of(this.actionForm.value)
        .pipe(delay(1000))
        .subscribe(dept => 
          {            
            const actionName = dept['actionName']!
            const actionDescription = dept['actionDescription']!
            if(this.dataToUpdate() === null)
            { 
                this.progress.set('...saving')
                this.store.dispatch(CREATE_AKTION({ pagee: 10, limit: this.limit(), page: this.theCurrentPage(), name: actionName, description: actionDescription }))
            } else {              
                this.progress.set('...updating')
                console.log("Updating Action")
                sleepWait(4000)
                this.store.dispatch(UPDATE_AKTION({ currentPage: this.theCurrentPage(), limit: this.limit(), action: this.dataToUpdate()._id, name: actionName, description: actionDescription  })) 
            }      
          }
        )
      } else {
         this.isLoading.set(false)
         this.actionForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-action"  }))
      }     
    }






    

}



