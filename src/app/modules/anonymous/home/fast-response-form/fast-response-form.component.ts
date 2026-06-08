import { AfterViewInit, Component, effect, EventEmitter, inject, input, Input, OnInit, output, Output, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { delay, of } from 'rxjs';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../../components/controls/input-field/input-field.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import AppState from '../../../../state/app.state';
import { getSpinnerStatus } from '../../../../state/selectors/spinner.selector';
import { SetErrorMessage, SetLoadingStatus } from '../../../../state/actions/spinner.action';
import { TextAreaComponent } from '../../../../components/controls/text-area/text-area.component';
import { FastForm } from '../../../../state/actions/user.actions';


export const FirstnameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { firstNameRequired : 'firstNameRequired' } :  null
}

export const SurnameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { surnameRequired : 'surnameRequired' } :  null
}

export const PhoneRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { phoneNumberRequired : 'phoneNumberRequired' } :  null
}
export const fastResponseDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { roleDescriptionRequired : 'roleDescriptionRequired' } :  null
}

@Component({
  selector: 'app-fast-response-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, InputFieldComponent, ModalComponent, TextAreaComponent],
  templateUrl: './fast-response-form.component.html',
  styleUrl: './fast-response-form.component.scss'
})
export class FastResponseFormComponent {

   private store = inject(Store<AppState>)

   title = signal<string>('')
   firstname = signal<string>('')
   surname = signal<string>('')
   phone = signal<string>('')
   email = signal<string>('')
   message = signal<string>('')
   isLoading = signal<boolean>(false)
   close = output<void>()
   responseStatus: number = 0

   statusCode!: number
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }

   rows: number = 4
   cols: number = 20

   errorMessages = 
   { 
      firstNameRequired: 'Enter firstname', 
      surnameRequired: 'Enter surname', 
      phoneNumberRequired: 'Enter phone number',
      passwordLength: 'Minimum password length is 8',
      required: 'Enter email',
      email: 'Enter a valid email',
      fastResponseDescriptionRequired: 'Enter message'
   }  

   fastResponseForm: FormGroup

   constructor()
   {
      this.fastResponseForm = new FormGroup(
        {
          firstname: new FormControl(null, [FirstnameRequired]),
          surname: new FormControl(null, [SurnameRequired]),
          phone: new FormControl(null, [PhoneRequired]),
          email: new FormControl('', [Validators.required, Validators.email]),
          message: new FormControl('', [fastResponseDescriptionRequired])
        }
      )
   }

   ngOnInit(): void 
   {
     this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
        this.responseStatus = data?.loader?.statusCode
        console.log(this.responseStatus)
        if(this.responseStatus === 200)
        {
          this.isLoading.set(false)
          this.fastResponseForm.reset()
          this.fastResponseForm.get('fistname')?.setValue("")
          this.fastResponseForm.get('surname')?.setValue("")
          this.fastResponseForm.get('phone')?.setValue("")
          this.fastResponseForm.get('email')?.setValue("")
          this.fastResponseForm.get('message')?.setValue("")
          this.close.emit()
        }
      }
     )
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
      this.fastResponseForm.reset()
      this.fastResponseForm.get('fistname')?.setValue("")
      this.fastResponseForm.get('surname')?.setValue("")
      this.fastResponseForm.get('phone')?.setValue("")
      this.fastResponseForm.get('email')?.setValue("")
      this.fastResponseForm.get('message')?.setValue("")
      this.close.emit()
    }    

    write = async () => 
    {
      this.isLoading.set(true)
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.fastResponseForm.valid === true)
      {
        of(this.fastResponseForm.value)
        .pipe(delay(1000))
        .subscribe(categ => 
          {
             const firstname = categ['firstname']!
             const surname = categ['surname']!
             const phone = categ['phone']!
             const email = categ['email']!
             const message = categ['message']!
             this.store.dispatch(FastForm({ firstname, surname, phone, email, message }))
          }
        )
      } else {
         this.fastResponseForm.markAllAsTouched()  
         this.message.set("Attend to all fields")
         this.isLoading.set(false)
         this.store.dispatch(SetErrorMessage({ msg: this.message(), statusCode: 400, operation: "send-fast-formr"  }))
      }     
    }    

}
