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
import { SelectComponent } from '../../../../../../components/controls/select/select.component';
import { MakeSelection } from '../../../../../auth/register/register.component';

export const lgaNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { localGovernmentNameRequired : 'localGovernmentNameRequired' } :  null
}


@Component({
  selector: 'app-write-local-government',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, InputFieldComponent, SelectComponent, ModalComponent, TextAreaComponent],
  templateUrl: './write-local-government.component.html',
  styleUrl: './write-local-government.component.scss'
})
export class WriteLocalGovernmentComponent implements OnInit {

   private store = inject(Store<AppState>)

   @Input() title: string = ''
   @Input() buttonName: string = ''
   @Output() close: EventEmitter<void> = new EventEmitter()

   rows: number = 7
   cols: number = 20
   value: string = ''
    
   pageTitle: string = ''
   isLoading: boolean = false
   message: string = ''
   statusCode!: number
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }
    
   countries:{ id: string, name: string }[] = 
   [
      { id: 'nigeria', name:'Nigeria' },
      { id: 'russia', name:'Russia' },
      { id: 'china', name:'China' },
      { id: 'Iran', name:'Iran' },
      { id: 'north-korea', name:'North Korea' }
   ]
    
   states:{ id: string, name: string }[] = 
   [
      { id: 'lagos', name:'Lagos' },
      { id: 'moscow', name:'Moscow' },
      { id: 'tehran', name:'Tehran' },
      { id: 'kumasi', name:'kumasi' }
   ]
  
   errorMessages = 
   { 
      localGovernmentNameRequired: 'Enter local government name', 
      selectionRequired: 'Make Selection',
   } 

   stateForm: FormGroup

   constructor()
   {
      this.stateForm = new FormGroup(
        {
          lgaName: new FormControl('', [lgaNameRequired]),
          country: new FormControl('-1', [MakeSelection]),
          state: new FormControl('-1', [MakeSelection]),
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
     this.store.select(getSpinnerStatus).subscribe((data: any) => {
      //  this.isLoading = status
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

    writeState()
    {

    }

    closeModal()
    {
       this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.stateForm.valid)
      {
        of(this.stateForm.value)
        .pipe(delay(1000))
        .subscribe(dept => 
          {
            const countryName = dept['countryName']!
            const stateName = dept['stateName']!      
            // this.store.dispatch(START_LOGIN({ countryName, stateName }))
          }
        )
      } else {
         this.stateForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-state"  }))
      }     
    }






    

}



