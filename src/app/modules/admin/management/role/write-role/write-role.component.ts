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
import { CREATE_ROLE, UPDATE_ROLE } from '../../../../../state/actions/management/role.actions';
import { CREATE_DEPARTMENT } from '../../../../../state/actions/management/department.actions';

export const roleNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { roleNameRequired : 'roleNameRequired' } :  null
}

export const roleDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { roleDescriptionRequired : 'roleDescriptionRequired' } :  null
}

@Component({
  selector: 'app-write-role',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, InputFieldComponent, ModalComponent, TextAreaComponent],
  templateUrl: './write-role.component.html',
  styleUrl: './write-role.component.scss'
})
export class WriteRoleComponent implements OnInit {

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
      roleNameRequired: 'Enter role name', 
      roleDescriptionRequired: 'Write a note about role to be created'
   } 

   roleForm: FormGroup

   constructor()
   {console.log(this.dataToUpdate())
      this.roleForm = new FormGroup(
        {
          roleName: new FormControl('', [roleNameRequired]),
          roleDescription: new FormControl('', [roleDescriptionRequired])
        }
      ) 
      this.store.select(getResponseMessage).subscribe((data) => 
      {
        const { statusCode, msg } = data.response
         this.message = msg
         this.statusCode = statusCode
      })


      effect(() => 
      {console.log(this.dataToUpdate())
         if(this.dataToUpdate())
         {
            this.name.set(this.dataToUpdate()?.data?.name)
            this.roleForm.get('roleName')?.setValue(this.dataToUpdate()?.data?.name)
            this.roleForm.get('roleDescription')?.setValue(this.dataToUpdate()?.data?.description)
         } else {
            this.roleForm.get('roleName')?.setValue("")
            this.roleForm.get('roleDescription')?.setValue("")
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
       this.close.emit()
    }
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.roleForm.valid === true)
      {
        of(this.roleForm.value)
        .pipe(delay(1000))
        .subscribe(role => 
          {
            if(this.dataToUpdate() === null)
            {    
               console.log('Creating')
               const roleName = role['roleName']!
               const roleDescription = role['roleDescription']!
               this.store.dispatch(CREATE_ROLE({ name: roleName, description: roleDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            } else {                       
               console.log('Updating')                  
               const roleName = role['roleName']!
               const roleDescription = role['roleDescription']!
               this.store.dispatch(UPDATE_ROLE({ role: this.dataToUpdate().id, name: roleName, description: roleDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            }
          }
        )
      } else {
         this.roleForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "write-department"  }))
      }     
    }






    

}

