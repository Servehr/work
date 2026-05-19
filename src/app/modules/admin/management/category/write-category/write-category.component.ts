import { AfterViewInit, Component, effect, EventEmitter, inject, input, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
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
import { CREATE_CATEGORY, CREATE_UPDATE } from '../../../../../state/actions/management/category.actions';

export const categoryNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { categoryNameRequired : 'categoryNameRequired' } :  null
}

export const categoryDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { categoryDescriptionRequired : 'categoryDescriptionRequired' } :  null
}

@Component({
  selector: 'app-write-category',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, BotinComponent, InputFieldComponent, ModalComponent, TextAreaComponent],
  templateUrl: './write-category.component.html',
  styleUrl: './write-category.component.scss'
})
export class WriteCategoryComponent implements OnInit {

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

    
   pageTitle: string = ''
   isLoading: boolean = false
   message: string = ''
   statusCode!: number
   style: any = {
     'background-color' : '#be9d18',
     'color': 'black',
     'padding': '20px'
   }

   rows: number = 7
   cols: number = 20
  
   errorMessages = 
   { 
      categoryNameRequired: 'Enter category name', 
      categoryDescriptionRequired: 'Write a note about category to be created'
   } 

   categoryForm: FormGroup

   constructor()
   {
      this.categoryForm = new FormGroup(
        {
          categoryName: new FormControl(null, [categoryNameRequired]),
          categoryDescription: new FormControl(null, [categoryDescriptionRequired])
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
            this.categoryForm.get('categoryName')?.setValue(this.dataToUpdate()?.data?.name)
            this.categoryForm.get('categoryDescription')?.setValue(this.dataToUpdate()?.data?.description)
            // this.name.set(this.dataToUpdate()?.data?.name.toString())
            // this.description.set(this.dataToUpdate()?.data?.description.toString())
         } else {
            this.categoryForm.get('categoryName')?.setValue("")
            this.categoryForm.get('categoryDescription')?.setValue("")
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
    closeModal()
    {
      this.categoryForm.reset()
      this.categoryForm.get('categoryName')?.setValue("")
      this.categoryForm.get('categoryDescription')?.setValue("")
      this.close.emit()
    }
    
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.categoryForm.valid === true)
      {
        of(this.categoryForm.value)
        .pipe(delay(1000))
        .subscribe(categ => 
          {
            if(this.dataToUpdate().id !== "")
            {                
               const id = this.dataToUpdate().id
               const categoryName = categ['categoryName']!
               const categoryDescription = categ['categoryDescription']!  
               console.log({ id, categoryName, categoryDescription })
               console.log("Update")
               this.store.dispatch(CREATE_UPDATE({ category: this.dataToUpdate().id, name: categoryName, description: categoryDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            } else {              
               const categoryName = categ['categoryName']!
               const categoryDescription = categ['categoryDescription']!  
               console.log("Create")
               this.store.dispatch(CREATE_CATEGORY({ name: categoryName, description: categoryDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
            }
          }
        )
      } else {
         console.log("Great")
         this.categoryForm.markAllAsTouched()  
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
      }     
    }
 

}
