import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { InputFieldComponent } from '../../../../components/controls/input-field/input-field.component';
import { SelectComponent } from '../../../../components/controls/select/select.component';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { Route, Router } from '@angular/router';
import { ProfessionalLocationComponent } from '../professional-location/professional-location.component';

export const professionNameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { professionNameRequired : 'professionNameRequired' } :  null
}

@Component({
  selector: 'app-skill-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, InputFieldComponent, SelectComponent, BotinComponent, ModalComponent, ProfessionalLocationComponent],
  templateUrl: './skill-search.component.html',
  styleUrl: './skill-search.component.scss'
})
export class SkillSearchComponent {

  private cdr = inject(ChangeDetectorRef)
  searchSelection = signal<string>('my-location')
  isOpen = signal<boolean>(false)
  modalWidth: string = 'w-[700px]'
  causeChanges = signal<string>('')

  style: any = {
    'background-color' : '#be9d18',
    'color': 'black',
    'padding': '20px'
  }

  options:{ id: string, name: string }[] = 
   [
      { id: 'user-location', name:'Use My Location' },
      { id: 'select-location', name:'Choose Location' }
   ]
  
  errorMessages = 
  { 
    professionNameRequired: 'Enter you search'
  }  

  skillSearchForm: FormGroup

  constructor(private router: Router)
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.skillSearchForm = new FormGroup(
      {
        profession: new FormControl('my-location', [professionNameRequired]),
        location: new FormControl('select-location'),
      }
    )
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

  closeModal = () => 
  {
     this.isOpen.set(false)
     this.skillSearchForm.get('location')?.patchValue({ location: 'my-location'})
     this.router.navigateByUrl(this.router.url); 
    // this.causeChanges.set(Math.random().toString(36).substring(2, 9))
    // this.cdr.detectChanges()    
  }
  
  onConfirm = () => 
  {
     
  }

  searchProfessionals = () => 
  {
     console.log(this.skillSearchForm.value)
  }

  changedValue = (selection: string) => 
  {
    if(selection === 'select-location')
    {
      this.isOpen.set(true)
    }
  }


}
