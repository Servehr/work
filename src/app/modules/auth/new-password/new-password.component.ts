import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgStyle } from '@angular/common';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { SelectComponent } from '../../../components/controls/select/select.component';
import { FooterComponent } from '../../../shared/anonymous/footer/footer.component';
import { HeaderComponent } from '../../../shared/anonymous/header/header.component';
import { InputFieldValidationComponent } from '../../../validations/input-field-validation/input-field-validation.component';
import AppState from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { SetErrorMessage, SetLoadingStatus } from '../../../state/actions/spinner.action';
import { delay, of } from 'rxjs';
import { START_RESET_PASSWORD } from '../../../state/actions/auth.actions';
import { getResponseMessage, getSpinnerStatus } from '../../../state/selectors/spinner.selector';
import { AlertComponent } from '../../../components/alert/alert.component';


export const PasswordRequiredAndLength = (control: AbstractControl): ValidationErrors | null => {
    return control.value.length >  0 ? 
                                      control.value.length < 8 ? { passwordLength : "Minimum password length is 8" } : null 
                                  :  { passwordRequired : "Enter Password" }
}


@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
               RouterModule, HeaderComponent, InputFieldValidationComponent, 
               FooterComponent, ReactiveFormsModule, InputFieldComponent,
               BotinComponent, NgStyle, SelectComponent, AlertComponent
           ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})

export class NewPasswordComponent
{
   title: string = 'Home Page'
   isLoading: boolean = false
   heading: string = 'Get New Password'
   disabled: boolean = false
   ChangeOnHover: boolean = false
   message: string = ''
   statusCode!: number
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }
  
   errorMessages = 
   { 
     required: "Enter password",
     password: 'Enter a password', 
     passwordRequired: 'Enter password' , 
     passwordLength: 'Password must be at least 8 character in length',
   }     
    
   stateOfOrigin:any[] = [
      { id: 'lagos', name:'Lagos' },
      { id: 'kuwait', name:'Kuwait' },
      { id: 'russia', name:'Moscow' }
   ]  
    
    newPasswordForm: FormGroup
    user: string = ''

   //  private route!: ActivatedRoute

    constructor(private router: Router, private store: Store<AppState>, private route: ActivatedRoute) 
    { 
       this.newPasswordForm = new FormGroup(
        {
           password: new FormControl('', [Validators.required]),
           cPassword: new FormControl('', [Validators.required])
        }
       ) 
      this.store.select(getResponseMessage).subscribe((data) => 
      {
         const { statusCode, msg } = data.response
         this.message = msg
         this.statusCode = statusCode
      }) 
      ////////////////
      
      this.store.select(getSpinnerStatus).subscribe((status: boolean) => {
         this.isLoading = status
      })
    }   

    ngOnInit()
    {
      this.store.select(getSpinnerStatus).subscribe((status: boolean) => {
         this.isLoading = status
      })
      const hashString = this.route.snapshot.queryParams['new']
      const userId: string[] = hashString.split(" ")
      this.user = userId[1]
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

    setNewPassword = async () => 
    {
       this.store.dispatch(SetLoadingStatus({ loading: true }))
       if(this.newPasswordForm.valid)
       {
          of(this.newPasswordForm.value)
          .pipe(delay(1000))
          .subscribe(UserDetail => 
              {
                const user: string = this.user
                const password = UserDetail['password']!      
                const cPassword = UserDetail['password']! 
                this.store.dispatch(START_RESET_PASSWORD({ user, password, cPassword }))
              }
          )
       } else {
          this.newPasswordForm.markAllAsTouched()
          this.store.dispatch(SetLoadingStatus({ loading: false }))
          this.message = "Attend to all fields"
          this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
       }     
    }
    
     
}
