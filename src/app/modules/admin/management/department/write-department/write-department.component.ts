import { Component, effect, EventEmitter, inject, input, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../state/selectors/spinner.selector';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BotinComponent } from '../../../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../../../components/controls/input-field/input-field.component';
import { ModalComponent } from '../../../../../components/modal/modal.component';
import { SetErrorMessage, SetLoadingStatus } from '../../../../../state/actions/spinner.action';
import { delay, of } from 'rxjs';
import { TextAreaComponent } from '../../../../../components/controls/text-area/text-area.component';
import { CREATE_DEPARTMENT, UPDATE_DEPARTMENT } from '../../../../../state/actions/management/department.actions';

export const departmentNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { departmentNameRequired : 'departmentNameRequired' } :  null
}

export const departmentDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { departmentDescriptionRequired : 'departmentDescriptionRequired' } :  null
}

@Component({
  selector: 'app-write-department',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, InputFieldComponent, ModalComponent, TextAreaComponent ],
  templateUrl: './write-department.component.html',
  styleUrl: './write-department.component.scss'
})
export class WriteDepartmentComponent implements OnInit {

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
     departmentNameRequired: 'Enter department name', 
     departmentDescriptionRequired: 'Write a note about department to be created'
   } 

   departmentForm: FormGroup

   constructor()
   {
      this.departmentForm = new FormGroup(
        {
          departmentName: new FormControl('', [departmentNameRequired]),
          departmentDescription: new FormControl('', [departmentDescriptionRequired])
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
            this.departmentForm.get('departmentName')?.setValue(this.dataToUpdate()?.data?.name)
            this.departmentForm.get('departmentDescription')?.setValue(this.dataToUpdate()?.data?.description)
         } else {
            this.departmentForm.get('departmentName')?.setValue("")
            this.departmentForm.get('departmentDescription')?.setValue("")
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
      this.departmentForm.reset()
      this.departmentForm.get('departmentName')?.setValue("")
      this.departmentForm.get('departmentDescription')?.setValue("")
      this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.departmentForm.valid === true)
      {
        of(this.departmentForm.value)
        .pipe(delay(1000))
        .subscribe(dept => 
          {
            if(this.dataToUpdate().id !== "")
            {                
               const departmentName = dept['departmentName']!
               const departmentDescription = dept['departmentDescription']!
               this.store.dispatch(UPDATE_DEPARTMENT({ department: this.dataToUpdate().id, name: departmentName, description: departmentDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            } else {              
               const departmentName = dept['departmentName']!
               const departmentDescription = dept['departmentDescription']!
               this.store.dispatch(CREATE_DEPARTMENT({ name: departmentName, description: departmentDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            }

          }
        )
      } else {
         this.departmentForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-department"  }))
      }     
    }






    

}

