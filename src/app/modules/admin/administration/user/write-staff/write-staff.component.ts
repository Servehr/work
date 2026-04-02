import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, delay } from 'rxjs';
import { SetLoadingStatus, SetErrorMessage } from '../../../../../state/actions/spinner.action';
import AppState from '../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';
import { categoryNameRequired, categoryDescriptionRequired } from '../../../management/category/write-category/write-category.component';
import { RouterModule } from '@angular/router';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../../../components/controls/input-field/input-field.component';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { FirstnameRequired, MakeSelection, PhoneRequired, SurnameRequired } from '../../../../auth/register/register.component';
import { SelectComponent } from '../../../../../components/controls/select/select.component';

@Component({
  selector: 'app-write-staff',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, InputFieldComponent, ModalComponent, SelectComponent],
  templateUrl: './write-staff.component.html',
  styleUrl: './write-staff.component.scss'
})
export class WriteStaffComponent implements OnInit {

   private store = inject(Store<AppState>)

   @Input() title: string = ''
   @Input() buttonName: string = ''
   @Output() close: EventEmitter<void> = new EventEmitter()
    
   departments:{ id: string, name: string }[] = 
   [
      { id: 'Human Resource', name:'Hr' },
      { id: 'Sales', name: 'Sales' },
      { id: 'Finance', name:'finance' },
      { id: 'agent', name:'agent' },
   ]
    
   pageTitle: string = ''
   writeStaff: boolean = false
   value: string = '-1'
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
      firstNameRequired: 'Enter firstname', 
      surnameRequired: 'Enter surname', 
      phoneNumberRequired: 'Enter phone number',
      passwordLength: 'Minimum password length is 8',
      required: 'Enter email',
      email: 'Enter a valid email'
   } 

   staffForm: FormGroup

   constructor()
   {
      this.staffForm = new FormGroup(
        {
          firstname: new FormControl('', [FirstnameRequired]),
          surname: new FormControl('', [SurnameRequired]),
          phoneNumber: new FormControl('', [PhoneRequired]),
          email: new FormControl('', [Validators.required]),
          department: new FormControl('-1', [MakeSelection]),
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

    wrteCategory()
    {

    }

    closeModal()
    {
       this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loading: true }))
      if(this.staffForm.valid)
      {
        of(this.staffForm.value)
        .pipe(delay(1000))
        .subscribe(categ => 
          {
            const categoryName = categ['categoryName']!
            const categoryDescription = categ['categoryDescription']!      
            // this.store.dispatch(START_LOGIN({ categoryName, categoryDescription }))
          }
        )
      } else {
         this.staffForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loading: false }))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
      }     
    }

}
