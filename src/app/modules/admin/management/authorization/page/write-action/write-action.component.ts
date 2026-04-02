import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
   @Input() buttonName: string = ''
   @Output() close: EventEmitter<void> = new EventEmitter()

   rows: number = 7
   cols: number = 20

    
   pageTitle: string = ''
   isLoading: boolean = false
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

   }

   ngOnInit(): void 
   {
     this.store.select(getSpinnerStatus).subscribe((status: boolean) => {
       this.isLoading = status
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

    writeDepartment()
    {

    }

    closeModal()
    {
       this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loading: true }))
      if(this.actionForm.valid)
      {
        of(this.actionForm.value)
        .pipe(delay(1000))
        .subscribe(dept => 
          {
            const actionName = dept['actionName']!
            const actionDescription = dept['actionDescription']!      
            // this.store.dispatch(START_LOGIN({ actionName, actionDescription }))
          }
        )
      } else {
         this.actionForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loading: false }))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-action"  }))
      }     
    }






    

}



