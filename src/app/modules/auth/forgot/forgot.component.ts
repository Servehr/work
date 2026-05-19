import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgStyle } from '@angular/common';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { FooterComponent } from '../../../shared/anonymous/footer/footer.component';
import { HeaderComponent } from '../../../shared/anonymous/header/header.component';
import { InputFieldValidationComponent } from '../../../validations/input-field-validation/input-field-validation.component';
import { delay, of } from 'rxjs';
import { SetErrorMessage, SetLoadingStatus } from '../../../state/actions/spinner.action';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { AUTH_FORGOT_START } from '../../../state/constants/auth';
import { START_FORGOT } from '../../../state/actions/auth.actions';
import { getResponseMessage, getSpinnerStatus } from '../../../state/selectors/spinner.selector';
import { AlertComponent } from '../../../components/alert/alert.component';


@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
               RouterModule, HeaderComponent, InputFieldValidationComponent, 
               FooterComponent, ReactiveFormsModule, InputFieldComponent,
               BotinComponent, NgStyle, AlertComponent
           ],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})

export class ForgotComponent
{
    store = inject(Store<AppState>)
    isLoading: boolean = false
    title: string = 'Forgot'
    heading: string = 'We will help you recover your password'
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
       email: 'Enter a valid email'
    }    
    
    forgotForm: FormGroup;

    constructor(private router: Router) 
    { 
       this.forgotForm = new FormGroup(
        {
           email: new FormControl('', [Validators.required, Validators.email])
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
      this.store.select(getSpinnerStatus).subscribe((data: any) => {
          // this.isLoading = status
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

    forgot = () =>
    {
       this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
       if(this.forgotForm.valid)
       {
         of(this.forgotForm.value)
         .pipe(delay(1000))
         .subscribe(UserDetail => 
         {
           const email = UserDetail['email']!
           this.store.dispatch(START_FORGOT({ email }))
         }
        )
      } else {
        this.forgotForm.markAllAsTouched()
        this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
        this.message = "Attend to all fields"
        this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "user-forgot-password"  }))
      }    
    }
    
     
}
