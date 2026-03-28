import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { TextAreaValueAccessorDirective } from '../../directives/text-area/text-area-value-accessor.directive';

@Component({
  selector: 'app-text-area-validation',
  standalone: true,
  imports: [JsonPipe, KeyValuePipe],
  templateUrl: './text-area-validation.component.html',
  styleUrl: './text-area-validation.component.scss'
})
export class TextAreaValidationComponent<T> extends TextAreaValueAccessorDirective<T> implements OnChanges {
   
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