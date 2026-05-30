import { Component, effect, EventEmitter, inject, input, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
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
import { CREATE_REXOURCE, UPDATE_REXOURCE } from '../../../../../../state/actions/management/rexource.actions';

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

   dataToUpdate = input<any>(null)
   currentPage = input<number>()
   perPage = input<number>()
   placeholder: string = ''

   id = signal<string>('')
   name = signal<string>('')
   description = signal<string>('')   

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

      effect(() => 
      {
         if(this.dataToUpdate())
         {
            this.name.set(this.dataToUpdate()?.data?.name)
            this.rexourceForm.get('rexourceName')?.setValue(this.dataToUpdate()?.data?.name)
            this.rexourceForm.get('rexourceDescription')?.setValue(this.dataToUpdate()?.data?.description)
         } else {
            this.rexourceForm.get('rexourceName')?.setValue("")
            this.rexourceForm.get('rexourceDescription')?.setValue("")
         }
      }, { allowSignalWrites: true })       

   }

   ngOnInit(): void 
   {
     this.store.select(getSpinnerStatus).subscribe((data: any) => 
      {
        this.isLoading = data?.loader?.loading
        if(!data?.loader?.loading)
        {
          this.closeModal()
        }
      }
     )
   }

  ngOnChanges(changes: SimpleChanges)
   {
     if(!changes['dataToUpdate'])
     {
         this.name.set(this.dataToUpdate()?.data?.name)
     }
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
      this.rexourceForm.reset()
      this.rexourceForm.get('rexourceName')?.setValue("")
      this.rexourceForm.get('rexourceDescription')?.setValue("")
      this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.rexourceForm.valid === true)
      {
        of(this.rexourceForm.value)
        .pipe(delay(1000))
        .subscribe(dept => 
          {
            if(this.dataToUpdate() === null)
            {     
                const rexourceName = dept['rexourceName']!
                const rexourceDescription = dept['rexourceDescription']!
                this.store.dispatch(CREATE_REXOURCE({ name: rexourceName, description: rexourceDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            } else {              
               const rexourceName = dept['rexourceName']!
               const rexourceDescription = dept['rexourceDescription']!
               this.store.dispatch(UPDATE_REXOURCE({ rexource: this.dataToUpdate().id, name: rexourceName, description: rexourceDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            }
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


