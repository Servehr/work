import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
          categoryName: new FormControl('', [categoryNameRequired]),
          categoryDescription: new FormControl('', [categoryDescriptionRequired])
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

    wrteCategory()
    {

    }

    closeModal()
    {
       this.close.emit()
    }
    
    
    write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loading: true }))
      if(this.categoryForm.valid)
      {
        of(this.categoryForm.value)
        .pipe(delay(1000))
        .subscribe(categ => 
          {
            const categoryName = categ['categoryName']!
            const categoryDescription = categ['categoryDescription']!      
            // this.store.dispatch(START_LOGIN({ categoryName, categoryDescription }))
          }
        )
      } else {
         this.categoryForm.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loading: false }))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
      }     
    }
 

}
