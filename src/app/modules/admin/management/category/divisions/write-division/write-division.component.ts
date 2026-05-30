import { Component, effect, EventEmitter, inject, Input, input, output, Output, signal, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { InputFieldComponent } from '../../../../../../components/controls/input-field/input-field.component';
import { TextAreaComponent } from '../../../../../../components/controls/text-area/text-area.component';
import { BoteenComponent } from '../../../../../../util/icons/boteen/boteen.component';
import { Store } from '@ngrx/store';
import AppState from '../../../../../../state/app.state';
import { getResponseMessage, getSpinnerStatus } from '../../../../../../state/selectors/spinner.selector';
import { BotinComponent } from '../../../../../../components/controls/botin/botin.component';
import { SetErrorMessage, SetLoadingStatus } from '../../../../../../state/actions/spinner.action';
import { delay, of } from 'rxjs';
import { CREATE_DIVISION, UPDATE_DIVISION } from '../../../../../../state/actions/management/division.actions.';

export const divisionNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { divisionNameRequired : 'divisionNameRequired' } :  null
}

export const divisionDescriptionRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { divisionDescriptionRequired : 'divisionDescriptionRequired' } :  null
}

@Component({
  selector: 'app-write-division',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, TextAreaComponent, BotinComponent],
  templateUrl: './write-division.component.html',
  styleUrl: './write-division.component.scss'
})
export class WriteDivisionComponent {

  private store = inject(Store<AppState>)

  @Input() title: string = ''
  @Input() buttonName: string = ''
  @Output() close: EventEmitter<void> = new EventEmitter()
  dataToUpdate = input<any>(null)
  currentPage = input<number>()
  perPage = input<number>()
  placeholder: string = ''
  category = input<string>('')
  refresh = output()

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
    divisionNameRequired: 'Enter division name', 
    divisionDescriptionRequired: 'Write a note about division to be created'
  } 

  divisionForm: FormGroup
  
  constructor()
  {
     this.divisionForm = new FormGroup(
      {
        divisionName: new FormControl(null, [divisionNameRequired]),
        divisionDescription: new FormControl(null, [divisionDescriptionRequired])
      }
     ) 
  
      effect(() => 
        {
          if(this.dataToUpdate())
          {
            this.name.set(this.dataToUpdate()?.data?.name)
            this.divisionForm.get('divisionName')?.setValue(this.dataToUpdate()?.name)
            this.divisionForm.get('divisionDescription')?.setValue(this.dataToUpdate()?.description)
          } else {
            this.divisionForm.get('divisionName')?.setValue("")
            this.divisionForm.get('divisionDescription')?.setValue("")
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
    if(changes['dataToUpdate'])
    {
      this.name.set(this.dataToUpdate()?.data?.name)
    }
  }

  write = async () => 
  {
    this.store.dispatch(SetLoadingStatus({ loader: { loading: true, statusCode: 0 }}))
    if(this.divisionForm.valid === true)
    {
      of(this.divisionForm.value)
      .pipe(delay(1000))
      .subscribe(divs => 
        {
          console.log(this.dataToUpdate())
          if(this.dataToUpdate() != null)
          {                
            const divisionName = divs['divisionName']!
            const divisionDescription = divs['divisionDescription']!
            console.log({ category: this.category(), division: this.dataToUpdate()._id, name: divisionName, description: divisionDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) })
            this.store.dispatch(UPDATE_DIVISION({ category: this.category(), division: this.dataToUpdate()._id, name: divisionName, description: divisionDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
          } else {              
             const divisionName = divs['divisionName']!
             const divisionDescription = divs['divisionDescription']!
             this.store.dispatch(CREATE_DIVISION({ category: this.category(), name: divisionName, description: divisionDescription, page: Number(this.currentPage()), perPage: Number(this.perPage()) }))
          }
        }
      )
    } else {
       this.divisionForm.markAllAsTouched()  
       this.message = "Attend to all fields"
       this.store.dispatch(SetErrorMessage({ msg: this.message, statusCode: 400, operation: "authenticate-user"  }))
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
    this.divisionForm.reset()
    this.divisionForm.get('divisionName')?.setValue("")
    this.divisionForm.get('divisionDescription')?.setValue("")
    this.close.emit()
  }

}
