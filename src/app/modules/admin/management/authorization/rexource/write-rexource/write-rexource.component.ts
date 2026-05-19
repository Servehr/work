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

export const rexourceNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { roleNameRequired : 'roleNameRequired' } :  null
}

export const rexourceDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { roleDescriptionRequired : 'roleDescriptionRequired' } :  null
}

@Component({
  selector: 'app-write-rexource',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, TextAreaComponent, InputFieldComponent, ModalComponent],
  templateUrl: './write-rexource.component.html',
  styleUrl: './write-rexource.component.scss'
})
export class WriteRexourceComponent implements OnInit {

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
      roleNameRequired: 'Enter resource name', 
      roleDescriptionRequired: 'Write a note about resource to be created'
   } 

   rexourceForm: FormGroup

   constructor()
   {
      this.rexourceForm = new FormGroup(
        {
          rexourceName: new FormControl('', [rexourceNameRequired]),
          rexourceDescription: new FormControl('', [rexourceDescriptionRequired])
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

    writeDepartment()
    {

    }

    closeModal()
    {
       this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.rexourceForm.valid)
      {
        of(this.rexourceForm.value)
        .pipe(delay(1000))
        .subscribe(dept => 
          {
            const rexsourceName = dept['rexsourceName']!
            const rexourceDescription = dept['rexourceDescription']!      
            // this.store.dispatch(START_LOGIN({ rexsourceName, rexourceDescription }))
          }
        )
      } else {
         this.rexourceForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-rexource"  }))
      }     
    }






    

}


