import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { InputFieldValueAccessorDirective } from '../../directives/input-field/input-field-value-accessor.directive';


@Component({
  selector: 'app-input-field-validation',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, KeyValuePipe],
  templateUrl: './input-field-validation.component.html',
  styleUrl: './input-field-validation.component.scss'
})
export class InputFieldValidationComponent<T> extends InputFieldValueAccessorDirective<T> implements OnChanges {
   
    @Input() errors: Record<string, ValidationErrors> | null = { };

    @Input() errorMessages: Record<string, string> =  {  }
    
    @Input() customErrorMessages: Record<string, string> = { }

    ngOnChanges(changes: SimpleChanges): void 
    {
       const { customErrorMessages } = changes
       
       if(customErrorMessages)
       {
          this.errorMessages = 
          {
             ...this.errorMessages, ...customErrorMessages.currentValue
          }
       }
    }


}