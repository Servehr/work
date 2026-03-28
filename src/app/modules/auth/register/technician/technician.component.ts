import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BotinComponent } from '../../../../components/controls/botin/botin.component';
import { InputFieldComponent } from '../../../../components/controls/input-field/input-field.component';
import { InputFieldValidationComponent } from '../../../../validations/input-field-validation/input-field-validation.component';
import { SelectComponent } from '../../../../components/controls/select/select.component';
import { IFileHandler } from '../../../../interface/FileHandler';
import { DragDropDirective } from '../../../../directives/drag-and-drop/drag-drop.directive';
import { ImageComponent } from '../../../../components/controls/image/image.component';
import { DomSanitizer } from '@angular/platform-browser';
import { bootstrapCloudArrowUpFill, bootstrapTrash } from '@ng-icons/bootstrap-icons';
import { NgIcon } from '@ng-icons/core';


// export const FirstnameRequiredAndLength = (control: AbstractControl): ValidationErrors | null => {
//     console.log(control.value.length)
//     return control.value.length >  0 ? 
//                                       control.value.length < 8 ? { passwordLengthSize : "Minimum password length is 8" } : null 
//                                   :  { passwordRequired : "Enter Password" }
// }

export const FirstnameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { firstNameRequired : 'firstNameRequired' } :  { firstNameRequired : control.value }
}

export const SurnameRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { surnameRequired : 'surnameRequired' } :  { surnameRequired : control.value }
}

export const PhoneRequired = (control: AbstractControl): ValidationErrors | null => 
{
   return control.value?.length === 0 || control.value === null ? { phoneNumberRequired : 'phoneNumberRequired' } :  { phoneNumberRequired : control.value }
}

const MakeSelection = (control: AbstractControl): ValidationErrors => 
{
   return control.value?.length === 0 || control.value === null ? { selectionRequired : 'selectionRequired' } :  { selectionRequired : control.value }
}

@Component({
  selector: 'app-technician',
  standalone: true,
  imports: [
             RouterModule, InputFieldValidationComponent, ReactiveFormsModule, InputFieldComponent,
             BotinComponent, NgStyle, SelectComponent, DragDropDirective, ImageComponent, 
             NgIcon
           ],
  templateUrl: './technician.component.html',
  styleUrl: './technician.component.scss'
})
export class TechnicianComponent 
{
    title: string = 'Register'
    value: string = '-1'
    disabled: boolean = false
    ChangeOnHover: boolean = false
    NIN: any[] = []
    passportPhotograph: any[] = []
    deleteIcon: any = bootstrapTrash
    cloudArrow: any = bootstrapCloudArrowUpFill
    style: any = {
       'background-color' : '#be9d18',
       'color': 'black',
       'padding': '20px'
    }
    
   categories: { id: string, name: string }[] = 
   [
      { id: 'technician', name:'Technician' },
      { id: 'apprenticeship', name:'TVet appretenship' },
      { id: 'vendor', name:'Vendor' },
      { id: 'agent', name:'Agent' },
      { id: 'partner', name:'Partners' }
   ]
    
   plans:{ id: string, name: string }[] = 
   [
      { id: 'free', name:'Free' },
      { id: 'Basic', name:'Basic' },
      { id: 'Plus', name:'Plus' },
      { id: 'premium', name:'Premium' },
      { id: 'gold', name:'Gold' }
   ] 

   errorMessages = 
   { 
      firstNameRequired: 'Enter firstname', 
      surnameRequired: 'Enter surname', 
      phoneNumberRequired: 'Enter phone number',
      surname: 'Enter surname', 
      dob: 'Select dob',
      phone: 'Enter phone number' , 
      required: 'Enter email',
      gender: 'Male or Female',
      maritalStatus: 'Are you single, married or divorced',
      states: 'Select a state',
      location: 'Enter Location',
      selectionRequired: 'Make Selection'
   } 
    
    registerForm: FormGroup;

    constructor(private router: Router, private saniter: DomSanitizer) 
    { 
       this.registerForm = new FormGroup(
        {
          firstname: new FormControl('', [FirstnameRequired]),
          surname: new FormControl('', [SurnameRequired]),
          phone: new FormControl('', [PhoneRequired]),
          email: new FormControl('', [Validators.required, Validators.email]),
         //  nin: new FormControl('', [Validators.required]),
         //  plan: new FormControl('', [Validators.required]),
        }
       )
    }   


    ngOnInit()
    {
      
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

    register = () =>
    {
       this.registerForm.markAllAsTouched()  
   }

   onFileSelectedChange = (event: any, type: string) =>
   {
      const file: any = event?.target?.files[0]

      const fileHandler: IFileHandler = {
         file: file,
         url: this.saniter?.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      if(type === 'nin')
      {
        this.NIN = []
        this.NIN.push(fileHandler?.url)
      }

      if(type === 'passport')
      {
        this.passportPhotograph = []
        this.passportPhotograph.push(fileHandler?.url)
      }

   }

   removeImages = (remove: string) =>
   {
      if(remove === 'nin')
      {
         this.NIN = []
      }
      if(remove === 'passport')
      {
         this.passportPhotograph = []
      }
   }
   
   dropFile = (upload: IFileHandler, type: string) => 
   {
      if(type === 'nin')
      {
        this.NIN = []
        this.NIN.push(upload?.url)
      }

      if(type === 'passport')
      {
        this.passportPhotograph = []
        this.passportPhotograph.push(upload?.url)
      }
   }
    
     
}

