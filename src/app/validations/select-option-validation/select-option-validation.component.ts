import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { SelectOptionValueAccessorDirective } from '../../directives/select-option/select-option-value-accessor.directive';


@Component({
  selector: 'app-select-option-validation',
  standalone: true,
  imports: [JsonPipe, KeyValuePipe],
  templateUrl: './select-option-validation.component.html',
  styleUrl: './select-option-validation.component.scss'
})


export class SelectOptionValidationComponent<T> extends SelectOptionValueAccessorDirective<T> implements OnChanges {
   
    @Input() errors: Record<string, ValidationErrors> | null = { };

    @Input() errorMessages: Record<string, string> = {
        selectionRequired: 'Select an option'
    }
    
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
       console.log(changes)
       console.log(this.errorMessages)
    }


}