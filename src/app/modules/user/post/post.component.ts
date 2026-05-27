import { Component, EventEmitter, inject, input, Input, OnChanges, OnInit, output, Output, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import AppState from '../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../state/selectors/spinner.selector';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BotinComponent } from '../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SetErrorMessage, SetLoadingStatus } from '../../../state/actions/spinner.action';
import { delay, of } from 'rxjs';
import { TextAreaComponent } from '../../../components/controls/text-area/text-area.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { RETRIEVE_CATEGORY } from '../../../state/actions/job.actions';
import { SearchComponent } from '../../../components/search/search.component';
import { SuggestionComponent } from '../../../components/suggestion/suggestion.component';
import { START_SUGGESTION } from '../../../state/actions/suggestion.actions';
import { getSearchSugesstions } from '../../../state/selectors/suggestion.selector';
import { CheckComponent } from '../../../components/controls/check/check.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';

export const jobNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { jobNameRequired : 'jobNameRequired' } :  null
}

export const jobDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { jobDescriptionRequired : 'jobDescriptionRequired' } :  null
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
              RouterModule, ReactiveFormsModule, CommonModule, NgIf, NgFor,
              BotinComponent, InputFieldComponent, CheckComponent, ModalComponent, TextAreaComponent, LoaderComponent, SearchComponent, SuggestionComponent
           ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit, OnChanges {

   private store = inject(Store<AppState>)

   @Input() title: string = ''
   @Input() buttonName: string = ''
   close = output()
   posting = input<boolean>(false)
   loadingCategories = signal<boolean>(false)
   enable = signal<boolean>(true)
   result = signal<any>([])
   division = signal<any>([])
    
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

   data: [] = []
   showList = signal<boolean>(false)

   selectedOption = signal<string[]>([])
   selectedCategory = signal<string>('')
  
   errorMessages = 
   { 
      jobNameRequired: 'Enter job name', 
      jobDescriptionRequired: 'Give necessary info about the job'
   } 

   postJob!: FormGroup;

   constructor(private fb: FormBuilder) {}

   ngOnInit(): void 
   {
      this.postJob = this.fb.group(
        {
          options: this.fb.array([]), // Initialize empty array
          jobInformation: new FormControl('', [jobDescriptionRequired]),
        }
      );

      this.store.select(getSearchSugesstions).subscribe((data: any) => 
        {
          this.result.set(data)
        }
      )
   }

   get options(): FormArray 
   {
      return this.postJob.get('options') as FormArray;
   }

   // Add/Remove methods
   addSkill() 
   { 
      // for (let index = 0; index < array.length; index++) 
      // {
      //   const element = array[index];
        
      // }
   }

  //  addSkill() { this.options.push(this.fb.control('')); }

  // addSkill() { this.options.push() }

  divisions = (data: any) => 
  {
     this.options.clear()
     this.selectedOption.set([])
     this.selectedCategory = data?.id
     if(data.divisions.length > 0)
     {
       for (let index = 0; index < data.divisions.length; index++) 
       {
         let content = data?.divisions[index]
         this.options.push(this.fb.control(content))      
       }
     }
  }

  closeModal()
  {
     this.close.emit()
  }
   
  removeSkill(i: number) { this.options.removeAt(i); }

  ngOnChanges(changes: SimpleChanges)
   {
     if(changes['posting'])
     {
        const url: string = 'category'
        this.store.dispatch(START_SUGGESTION({ url }))
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
       
  write = async () => 
    {
      this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
      if(this.postJob.valid)
      {
        of(this.postJob.value)
        .pipe(delay(1000))
        .subscribe(categ => 
          {
            const categoryName = categ['categoryName']!
            const categoryDescription = categ['categoryDescription']!      
            // this.store.dispatch(START_LOGIN({ categoryName, categoryDescription }))
          }
        )
      } else {
         this.postJob.markAllAsTouched()
         this.store.dispatch(SetLoadingStatus({ loader: { loading: false, statusCode: 0 }}))
         this.message = "Attend to all fields"
         this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
      }     
  }

  sendIt()
  {
    console.log(this.selectedOption(), this.selectedCategory)
  }

  selectDivision(option: any)
  {
    if(this.selectedOption().includes(option))
    {
      this.selectedOption.update(current => current.filter(str => str !== option))
      console.log(`${option} is removed`)
    } else {
      this.selectedOption().push(option)
      console.log(`${option} is added`)
    }
  }


}
