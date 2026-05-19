import { Component, effect, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { getSpinnerStatus } from '../../../state/selectors/spinner.selector';
import { SetLoadingStatus } from '../../../state/actions/spinner.action';
import { delay, of } from 'rxjs';
import { SUBSCRIBE } from '../../../state/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [BotinComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
 
   private router = inject(Router)

   subscribe: FormGroup;
   disabled: boolean = false
   isLoading = signal<boolean>(false)
   statusCode = signal<number>(0)
   userEmail: string = ''
   inputStyle: any = {
       'border-raidus' : '30%'
   }
   style: any = 
   {
      'background-color' : '#be9d18',
      'color': 'black',
      'padding': '20px'
   }

   errorMessages = 
   { 
      required: 'Enter email',
      email: 'Enter a valid email'
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
    
   constructor(private store: Store<AppState>) 
   { 
     this.subscribe = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email])
      }
     )
     effect(() => 
      {
         if(this.statusCode() === 200)
         {
            this.subscribe.reset()
         }
      }, { allowSignalWrites: true });
   } 
   
   ngOnInit()
   {
      this.isLoading.set(false)
      this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
        this.isLoading.set(data?.loader?.loading)
        this.statusCode.set(data?.loader?.statusCode)
      }) 
    }

    reload= () => 
    {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => 
        {
          this.router.navigate([this.router.url]);
        });
    }

   subscribeForNewsletter = () => 
   {
      if(this.subscribe.valid)
      {
        this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 } }))
        of(this.subscribe.value)
          .pipe(delay(1000))
          .subscribe(UserDetail => 
          { 
              const email: string  = UserDetail['email']!  
              this.store.dispatch(SUBSCRIBE({ email }))
          })
      }
   }

}
