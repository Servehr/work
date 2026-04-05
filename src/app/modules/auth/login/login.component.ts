import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
import { START_LOGIN } from '../../../state/actions/auth.actions';
import { getResponseMessage, getSpinnerStatus } from '../../../state/selectors/spinner.selector';
import { AlertComponent } from '../../../components/alert/alert.component';
import { NgIcon } from '@ng-icons/core';


export const PasswordRequiredAndLength = (control: AbstractControl): ValidationErrors | null => {
    return control.value.length >  0 ? 
                                      control.value.length < 8 ? { passwordLength : "Minimum password length is 8" } : null 
                                  :  { passwordRequired : "Enter Password" }
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
               RouterModule, HeaderComponent, InputFieldValidationComponent, 
               FooterComponent, ReactiveFormsModule, InputFieldComponent,
               BotinComponent, NgStyle, SelectComponent, AlertComponent, NgIcon
           ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent
{
   title: string = 'Home Page'
   isLoading: boolean = false
   heading: string = 'Login'
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
     required: "Enter email",
     email: 'Enter a valid email', 
     passwordRequired: 'Enter password' , 
     passwordLength: 'Password must be at least 8 character in length',
   }     
    
   stateOfOrigin:any[] = [
     { id: 'lagos', name:'Lagos' },
     { id: 'kuwait', name:'Kuwait' },
     { id: 'russia', name:'Moscow' }
   ]  
    
    loginForm: FormGroup;

    constructor(private router: Router, private store: Store<AppState>) 
    { 
      this.loginForm = new FormGroup(
       {
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', [PasswordRequiredAndLength])
       }
      ) 
      this.store.select(getResponseMessage).subscribe((data) => 
      {
         const { statusCode, msg } = data.response
         this.message = msg
         this.statusCode = statusCode
      }) 
    }   

    ngOnInit()
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

    authenticate = async () => 
    {
       this.store.dispatch(SetLoadingStatus({ loading: true }))
       if(this.loginForm.valid)
       {
          of(this.loginForm.value)
          .pipe(delay(1000))
          .subscribe(UserDetail => 
              {
                const email = UserDetail['email']!
                const password = UserDetail['password']!      
                this.store.dispatch(START_LOGIN({ email, password }))
              }
          )
       } else {
          this.loginForm.markAllAsTouched()
          this.store.dispatch(SetLoadingStatus({ loading: false }))
          this.message = "Attend to all fields"
          this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
       }     
    }
    
     
}
