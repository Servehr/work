import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { RadioCheckValueAccessorDirective } from '../../directives/radio-check/radio-check-value-accessor.directive';


@Component({
  selector: 'app-radio-check-validation',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, KeyValuePipe],
  templateUrl: './radio-check-validation.component.html',
  styleUrl: './radio-check-validation.component.scss'
})
export class RadioCheckValidationComponent<T> extends RadioCheckValueAccessorDirective<T> implements OnChanges {
   
    @Input() errors: Record<string, ValidationErrors> | null = { };

    @Input() errorMessages: Record<string, string> = { }
    
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