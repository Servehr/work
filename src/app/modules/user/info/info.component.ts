import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../components/controls/input-field/input-field.component';
import { FormGroup } from '@angular/forms';
import { LabelComponent } from '../../../components/controls/label/label.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [InputFieldComponent, LabelComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
   
   heading: string = 'User Information'

   errorMessages = 
   { 
      firstNameRequired: 'Enter firstname', 
      surnameRequired: 'Enter surname', 
      phoneNumberRequired: 'Enter phone number',
      required: 'Enter email',
      email: 'Enter a valid email',
      selectionRequired: 'Make Selection'
   } 

  //  registerForm: FormGroup;

}
